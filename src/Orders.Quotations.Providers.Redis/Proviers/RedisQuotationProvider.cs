using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Orders.Quotations.Providers;
using Orders.Quotations.Stores;
using StackExchange.Redis;

namespace Orders.Quotations.Proviers
{
    public class RedisQuotationProvider : QuotationProvider
    {
        private readonly string[] _channels;
        private readonly ConfigurationOptions _options;
        private readonly Quotations.RedistQuotationProviderSetting _setting;
        private readonly ISymbolStore _store;

        private ConnectionMultiplexer _service;
        private IDictionary<string, Symbol> _symbolsMap;
        private DateTime _symbolUpdateTime;

        public RedisQuotationProvider(ISymbolStore store, Quotations.RedistQuotationProviderSetting setting)
        {
            if (store == null) throw new ArgumentNullException(nameof(store));
            if (setting == null) throw new ArgumentNullException(nameof(setting));
            _store = store;
            _setting = setting;
            _channels = setting.Channel;
            _options = new ConfigurationOptions
            {
                AllowAdmin = true,
                Password = setting.Password,
                EndPoints =
                {
                    new DnsEndPoint(setting.Server, setting.Port)
                }
            };
        }

        public IDictionary<string, Symbol> SymbolMap
        {
            get
            {
                if ((_symbolsMap == null) || ((DateTime.Now - _symbolUpdateTime).TotalMinutes > 15))
                {
                    var dbData = _store.Symbols;
                    if (_symbolsMap == null)
                        _symbolsMap = dbData.ToDictionary(s => s.Id.ToString(), s => s);
                    else
                        UpdateSymbol(dbData);
                    _symbolUpdateTime = DateTime.Now;
                }

                return _symbolsMap;
            }
        }

        public bool Running { get; set; }

        private void UpdateSymbol(IEnumerable<Symbol> dbsymbols)
        {
            //注意，这里只能通过prop，设置方式进行更新属性。防止Symbol被引用了，但是没有及时更新。
            var updatedList = dbsymbols.ToDictionary(s => s.Id.ToString(), s => s);
            lock (_symbolsMap)
            {
                foreach (var dbsymbol in dbsymbols)
                    if (!_symbolsMap.ContainsKey(dbsymbol.Id.ToString()))
                    {
                        _symbolsMap.Add(dbsymbol.Id.ToString(), dbsymbol);
                    }
                    else
                    {
                        var symbol = _symbolsMap[dbsymbol.Id.ToString()];
                        symbol.Name = dbsymbol.Name;
                        symbol.Code = dbsymbol.Code;
                        symbol.Scale = dbsymbol.Scale;
                    }
                //不存在的删除。
                foreach (var key in _symbolsMap.Keys)
                    if (!updatedList.ContainsKey(key))
                        _symbolsMap.Remove(key);
            }
        }

        public override void Start()
        {
            if (Running)
                return;
            if (SymbolMap.Count == 0)
                throw new Exception("Symbol List 为空。");


            _service = ConnectionMultiplexer.Connect(_options);

            foreach (var subChannel in _channels)
                _service.GetSubscriber()
                    .Subscribe(subChannel, (channel, message) =>
                    {
                        if (!message.HasValue)
                            return;
                        var quotation = ToQuotation(message);
                        quotation.Channel = channel;
                        OnReceived(quotation);
                    });
            Running = true;
        }

        private Quotation ToQuotation(string message)
        {
            var c = message.Split('|');
            var time = Convert.ToInt32(c[0]);
            var quotationInfo = c[1].Split(',');
            var symbolIndex = quotationInfo[0];
            if (!SymbolMap.ContainsKey(symbolIndex))
                return null;
            var symbol = SymbolMap[symbolIndex];

            var sclare = Convert.ToDecimal(Math.Pow(10, symbol.Scale));

            var quotation = new Quotation(symbol, time)
            {
                Bid = Convert.ToDecimal(quotationInfo[1]) / sclare,
                Direction = (Direction)Enum.ToObject(typeof(Direction), Convert.ToInt32(quotationInfo[2]))
            };
            //方向
            if (quotationInfo.Length >= 4)
                quotation.Spread = Convert.ToInt32(quotationInfo[3]);

            return quotation;
            ;
        }

        public override void Stop()
        {
            Running = false;
            _service?.Close();
        }

        public override void Dispose()
        {
            _service.Dispose();
        }
    }
}
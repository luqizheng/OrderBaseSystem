using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Orders.Quotations;
using Orders.Quotations.Providers;
using Orders.Quotations.Stores;

namespace Orders.System.Demo
{
    public class DemoQuotationProvider : QuotationProvider
    {
        private readonly Random _radom = new Random(DateTime.Now.Day);
        private readonly ISymbolStore _stores;
        private readonly IDictionary<int, Symbol> symbols = new Dictionary<int, Symbol>();
        private Timer _timer;

        public DemoQuotationProvider(ISymbolStore stores)
        {
            _stores = stores;
            symbols = stores.Symbols.ToDictionary(s => s.Id, s => s);
        }

        public override void Start()
        {
            if (_timer == null)
                _timer = new Timer(Method, this, 100, 100);
        }

        private void Method(object state)
        {
            for (var i = 0; i < 2; i++)
            {
                var id = _radom.Next(1, 20);
                if (symbols.ContainsKey(id))
                {
                    var symbol = symbols[id];
                    var quote = new Quotation(symbol,
                        DateTimeOffset.UtcNow.ToUnixTimeSeconds())
                    {
                        Bid = _radom.Next(1000, 2000)
                    };
                    OnReceived(quote);
                }
            }
        }

        public override void Stop()
        {
            _timer.Dispose();
            _timer = null;
        }
    }
}
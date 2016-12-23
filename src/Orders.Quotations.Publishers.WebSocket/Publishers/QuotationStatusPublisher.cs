using System;
using System.Collections.Generic;
using System.Threading;
using Orders.Quotations.Stores;
using Ornament.WebSockets;
using Ornament.WebSockets.Handlers;

namespace Orders.Quotations.Publishers
{
    public class QuotationStatusPublisher : IDisposable
    {
        private readonly QuotationContext _contetContext;
        private readonly ISymbolStore _symbolStore;
        private WebSocketHandler _handler;

        private IEnumerable<Symbol> _symbols;
        private Timer _timer;

        public QuotationStatusPublisher(QuotationContext contetContext, ISymbolStore symbolStore)
        {
            _contetContext = contetContext;
            _symbolStore = symbolStore;
        }

        public WebSocketHandler Handler
        {
            get { return _handler; }
            set
            {
                _handler = value;
                _timer = new Timer(Method, null, 200, 200);
            }
        }

        public IEnumerable<Symbol> Symbols
        {
            get
            {
                if (_symbols == null)
                    _symbols = _symbolStore.Symbols;
                return _symbols;
            }
        }


        public void Dispose()
        {
            _timer.Dispose();
        }

        private void Method(object state)
        {
            foreach (var symbol in Symbols)
            {
                var queue = _contetContext.GetList(symbol.Id);
                if (queue == null)
                    continue;
                var feaquence = 0;
                var amplitude = 0;
                queue.Overview(DateTimeOffset.Now.AddSeconds(-3), DateTimeOffset.Now, out feaquence, out amplitude);
                Handler.GetClients()
                    .SendTextAsnyc(string.Format("{0},{1},{2}", symbol.Id, feaquence, amplitude), CancellationToken.None)
                    ;
            }
        }
    }
}
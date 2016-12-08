using System;
using System.Collections.Generic;
using System.Threading;
using Orders.Policy;
using Orders.Quotations;
using Orders.Stores;

namespace Orders
{
    public class CloseOrderService
    {
        private readonly OrderContext _orderContext;
        private readonly QuotationContext _qutationContext;
        private readonly IOrderStore _store;
        private Timer _timer;

        public CloseOrderService(OrderContext orderContext, QuotationContext qutationContext, IOrderStore store)
        {
            _orderContext = orderContext;
            _qutationContext = qutationContext;
            _store = store;
            CloseOrderPricePolicies = new List<IClosePricePolicy>();
        }

        /// <summary>
        /// </summary>
        public IList<IClosePricePolicy> CloseOrderPricePolicies { get; set; }

        private void TryClose(object state)
        {
            var orders = _orderContext.UncloseOrders.DequeueUncloseOrders(DateTime.Now);
            foreach (var order in orders)
            {
                foreach (var polic in CloseOrderPricePolicies)
                {
                    Quotation closePrice;
                    if (polic.TryGetPrice(_qutationContext, order, out closePrice))
                    {
                        order.Close(closePrice);
                        _store.Insert(order);
                        break;
                    }
                }
            }
        }

        public void Start()
        {
            _timer = new Timer(TryClose, this, 100, 500);
        }

        public void Stop()
        {
            _timer.Dispose();
        }
    }
}
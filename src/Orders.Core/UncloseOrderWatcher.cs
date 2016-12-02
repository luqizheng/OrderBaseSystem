using System;
using System.Threading;
using Orders.Policy;
using Orders.Policy.PricePolicies;
using Orders.Quotations;
using Orders.Stores;

namespace Orders
{
    /// <summary>
    /// 持仓单队列检查器。如果设置为本服务可以平仓
    /// 那么就会进行平仓，否则只会把持仓单移除
    /// </summary>
    public class UncloseOrderWatcher
    {
        private readonly OrderContext _orderContext;
        private readonly IPricePolicyStore _pricePolicyStore;
        private readonly OrderServiceBuilder _builder;
        private readonly QuotationContext _qutationContext;
        private readonly IOrderStore _store;
        private Timer _timer;

        public UncloseOrderWatcher(OrderContext orderContext,
            QuotationContext qutationContext, IOrderStore store,
            IPricePolicyStore pricePolicyStore, OrderServiceBuilder builder)
        {
            if (orderContext == null) throw new ArgumentNullException(nameof(orderContext));
            if (qutationContext == null) throw new ArgumentNullException(nameof(qutationContext));
            if (store == null) throw new ArgumentNullException(nameof(store));
            if (pricePolicyStore == null) throw new ArgumentNullException(nameof(pricePolicyStore));
            _orderContext = orderContext;
            _qutationContext = qutationContext;
            _store = store;
            _pricePolicyStore = pricePolicyStore;
            _builder = builder;

            DefaultClosePricePolicy = new RealTimeCloseOpenPricePolicy();
        }

        public IClosePricePolicy DefaultClosePricePolicy { get; }


        private void TryClose(object state)
        {
            var orders = _orderContext.UncloseOrders.DequeueUncloseOrders(DateTime.Now);
            if (!_builder.EnableCloseSerivce)
                return;
            foreach (var order in orders)
            {
                foreach (var polic in _pricePolicyStore.GetClosePricePolicies(order.User))
                    ClosePrice(polic, order);
                if (order.Status == OrderStatus.Opening)
                    ClosePrice(DefaultClosePricePolicy, order);
            }
        }

        private void ClosePrice(IClosePricePolicy policy, Order order)
        {
            Quotation closePrice;
            if (policy.TryGetPrice(_qutationContext, order, out closePrice))
            {
                order.Close(closePrice);
                _store.Insert(order);
                Closed?.Invoke(this, order);
            }
        }

        public event EventHandler<Order> Closed;

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
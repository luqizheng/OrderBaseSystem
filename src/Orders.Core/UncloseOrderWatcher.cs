using System;
using System.Threading;
using Orders.Notify;
using Orders.Policy;
using Orders.Policy.PricePolicies;
using Orders.Quotations;
using Orders.Stores;

namespace Orders
{
    /// <summary>
    ///     持仓单队列检查器。如果设置为本服务可以平仓
    ///     那么就会进行平仓，否则只会把持仓单移除
    /// </summary>
    public class UncloseOrderWatcher
    {
        private readonly OrderServiceBuilder _builder;
        private readonly OrderContext _orderContext;
        private readonly OrderNotifyManager _orderNotifyer;
        private readonly IPricePolicyStore _pricePolicyStore;
        private readonly QuotationContext _qutationContext;
        private readonly IOrderStore _store;
        private Timer _timer;

        public UncloseOrderWatcher(OrderContext orderContext,
            QuotationContext qutationContext, IOrderStore store,
            IPricePolicyStore pricePolicyStore, OrderServiceBuilder builder, OrderNotifyManager orderNotifyer)
        {
            if (orderContext == null) throw new ArgumentNullException(nameof(orderContext));
            if (qutationContext == null) throw new ArgumentNullException(nameof(qutationContext));
            if (store == null) throw new ArgumentNullException(nameof(store));
            if (pricePolicyStore == null) throw new ArgumentNullException(nameof(pricePolicyStore));
            if (builder == null) throw new ArgumentNullException(nameof(builder));

            _orderContext = orderContext;
            _qutationContext = qutationContext;
            _store = store;
            _pricePolicyStore = pricePolicyStore;
            _builder = builder;
            _orderNotifyer = orderNotifyer;

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
                //use default close price policy to close this order;
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
                _store.Close(order);

                _orderNotifyer.OnClosed(order);
                return;
            }
            throw new CloseOrderException("无法获取报价");
        }


        public void Start()
        {
            _timer = new Timer(TryClose, this, 500, 1500);
        }

        public void Stop()
        {
            _timer.Dispose();
        }
    }
}
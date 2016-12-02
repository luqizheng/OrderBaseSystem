using System.Collections.Generic;

namespace Orders.Notify
{
    public class OrderNotifyManager : IOrderNotify
    {
        private readonly IEnumerable<IOrderNotify> _notifies;

        public OrderNotifyManager(IEnumerable<IOrderNotify> notifies)
        {
            _notifies = notifies;
        }

        public void OnCreated(Order order)
        {
            foreach (var notify in _notifies)
                notify.OnCreated(order);
        }

        public void OnCreating(OpenOrderInfo openOrderInfo)
        {
            foreach (var notify in _notifies)
                notify.OnCreating(openOrderInfo);
        }

        public void OnClosing(Order order)
        {
            foreach (var notify in _notifies)
                notify.OnClosing(order);
        }

        public void OnClosed(Order order)
        {
            foreach (var notify in _notifies)
                notify.OnClosed(order);
        }
    }
}
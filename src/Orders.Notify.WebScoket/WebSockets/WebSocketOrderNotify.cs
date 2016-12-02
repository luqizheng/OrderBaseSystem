using System;
using Ornament.WebSockets;

namespace Orders.Notify.WebSockets
{
    public class WebSocketOrderNotify : IOrderNotify
    {
        internal const string AdminGroup = "admin";
        private readonly UserWebSocketContainer _containter;
        private readonly WebSocketManager _manager;

        public WebSocketOrderNotify(WebSocketManager manager, UserWebSocketContainer containter)
        {
            if (manager == null) throw new ArgumentNullException(nameof(manager));
            if (containter == null) throw new ArgumentNullException(nameof(containter));
            _manager = manager;
            _containter = containter;
        }

        public void OnCreated(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            _containter.SendTo(AdminGroup, order, _manager);
        }

        public void OnCreating(OpenOrderInfo openOrderInfo)
        {
            _containter.SendTo(AdminGroup, openOrderInfo, _manager);
        }

        public void OnClosing(Order order)
        {
            _containter.SendTo(AdminGroup, order, _manager);
        }

        public void OnClosed(Order order)
        {
            _containter.SendTo(AdminGroup, order, _manager);
        }
    }
}
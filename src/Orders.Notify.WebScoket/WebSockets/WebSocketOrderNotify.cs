using System;

namespace Orders.Notify.WebSockets
{
    public class WebSocketOrderNotify : IOrderNotify
    {
        internal const string AdminGroup = "admin";

        internal const string DefaultGroup = "default";

        private readonly UserWebSocketContainer _containter;


        public WebSocketOrderNotify(UserWebSocketContainer containter)
        {
            if (containter == null)
                throw new ArgumentNullException(nameof(containter));

            _containter = containter;
        }

        public void OnCreated(Order order)
        {
            if (order == null)
                throw new ArgumentNullException(nameof(order));

            _containter.SendTo(AdminGroup, new
            {
                @event = "Open",
                order
            });

            _containter.SendTo(order.User, new
            {
                @event = "Open",
                order = new
                {
                    order.Id,
                    openPrice = order.OpenInfo.Price,
                    opennTime = order.OpenInfo.Price.ArrivedTime
                }
            });
        }

        public void OnCreating(OpenOrderInfo openOrderInfo)
        {
            //if (openOrderInfo == null)
            //    throw new ArgumentNullException(nameof(openOrderInfo));

            //_containter.SendTo(AdminGroup, openOrderInfo);
        }

        public void OnClosing(Order order)
        {
            //if (order == null)
            //    throw new ArgumentNullException(nameof(order));
            //_containter.SendTo(AdminGroup, order);
        }

        public void OnClosed(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            _containter.SendTo(AdminGroup,
                new
                {
                    @event = "Close",
                    order
                });

            _containter.SendTo(order.User, new
            {
                @event = "Close",
                order = new
                {
                    order.Profit,
                    order.Id
                }
            });
        }
    }
}
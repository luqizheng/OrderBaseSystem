using Orders.Games;

namespace Orders.Policy.OrderPolices
{
    /// <summary>
    ///     检查两张但之间的时间，如果大于定于的秒数，就会拒绝交易
    /// </summary>
    public class OrderCreatingCheckingTimespanPolicy : IOrderPolicy
    {
        private readonly int _orderSeconds;

        public OrderCreatingCheckingTimespanPolicy()
        {
        }

        public OrderCreatingCheckingTimespanPolicy(int orderSeconds)
        {
            _orderSeconds = orderSeconds;
        }

        public int Priority { get; set; }
        public string Message => "两张单之间不能超过" + _orderSeconds + "秒";

        public bool IsPass(OpenOrderInfo openOrder, Game game, string user, OrderContext context)
        {
            var lastOrder =
                context.UncloseOrders.Statistics.GetLastOrder(game.Symbol.Id, user);

            if (lastOrder == null)
                return true;
            return (openOrder.ArriveDateTime - lastOrder.CreateTime).TotalSeconds > _orderSeconds;
        }
    }
}
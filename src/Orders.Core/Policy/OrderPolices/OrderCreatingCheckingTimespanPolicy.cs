namespace Orders.Policy.OrderPolices
{
    public class OrderCreatingCheckingTimespanPolicy : IOrderPolicy
    {
        private readonly int _orderSeconds;

        public OrderCreatingCheckingTimespanPolicy(int orderSeconds)
        {
            _orderSeconds = orderSeconds;
        }

        public int Priority { get; set; }
        public string Message => "两张单之间不能超过" + _orderSeconds + "秒";

        public bool IsPass(OrderCreateDto order, OrderContext context)
        {
            var lastOrder =
                context.UncloseOrders.Statistics.GetLastOrder(order.SymbolId, order.User);

            if (lastOrder == null)
                return true;
            return (order.ArriveDateTime - lastOrder.CreateTime).TotalSeconds > _orderSeconds;
        }
    }
}
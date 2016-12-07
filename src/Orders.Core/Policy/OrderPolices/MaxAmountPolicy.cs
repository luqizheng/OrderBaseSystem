namespace Orders.Policy.OrderPolices
{
    public class MaxAmountPolicy : IOrderPolicy
    {
        public decimal MaxAmount { get; set; } = 2000;
        public int Priority { get; set; }
        public string Message => $"持仓金额大于" + MaxAmount + "不能再创建金额";

        public bool IsPass(OrderCreateDto order, OrderContext context)
        {
            decimal amount;
            int
                orderCount;
            context.Statistics.OrderCount(order.SymbolId, order.User, out amount, out orderCount);

            return amount >= MaxAmount;
        }
    }
}
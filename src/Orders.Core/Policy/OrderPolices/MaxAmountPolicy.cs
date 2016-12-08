namespace Orders.Policy.OrderPolices
{
    /// <summary>
    /// 
    /// </summary>
    public class MaxAmountPolicy : IOrderPolicy
    {
        /// <summary>
        /// 
        /// </summary>
        public decimal MaxAmount { get; set; } = 2000;
        /// <summary>
        /// 
        /// </summary>
        public int Priority { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Message => $"持仓金额大于" + MaxAmount + "不能再创建金额";
        /// <summary>
        /// 
        /// </summary>
        /// <param name="order"></param>
        /// <param name="context"></param>
        /// <returns></returns>
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
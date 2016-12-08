using Orders.Games;

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
        /// <param name="openOrder"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public bool IsPass(OpenOrderInfo openOrder, Game game, string user, OrderContext context)
        {
            decimal amount;
            int
                orderCount;
            context.Statistics.OrderCount(game.Symbol.Id, user, out amount, out orderCount);

            return amount >= MaxAmount;
        }
    }
}
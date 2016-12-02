using System;
using Orders.Games;

namespace Orders.Policy.OrderPolices
{
    /// <summary>
    /// </summary>
    public class MaxAmountPolicy : IOrderPolicy
    {
        /// <summary>
        /// </summary>
        public decimal MaxAmount { get; set; } = 2000;

        /// <summary>
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// </summary>
        public string Message => $"持仓金额大于" + MaxAmount + "不能再创建金额";

        /// <summary>
        /// </summary>
        /// <param name="openOrder"></param>
        /// <param name="user"></param>
        /// <param name="context"></param>
        /// <param name="game"></param>
        /// <returns></returns>
        public bool IsPass(OpenOrderInfo openOrder, Game game, string user,
            OrderContext context)
        {
            if (game == null) throw new ArgumentNullException(nameof(game));
            if (context == null) throw new ArgumentNullException(nameof(context));
            decimal amount;
            int
                orderCount;
            context.UncloseOrders.Statistics.OrderCount(game.Symbol.Id, user, out amount, out orderCount);

            return amount >= MaxAmount;
        }
    }
}
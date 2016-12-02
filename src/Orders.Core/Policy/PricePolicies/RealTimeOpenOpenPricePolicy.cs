using System;
using Orders.Games;
using Orders.Quotations;

namespace Orders.Policy.PricePolicies
{
    /// <summary>
    ///     实时报价取价策略。
    /// </summary>
    public class RealTimeOpenPricePolicy : IOpenPricePolicy
    {
        /// <summary>
        /// </summary>
        public int Priority { get; } = 0;

        /// <summary>
        /// </summary>
        public string Message => "暂时无报价，请联系管理员.";


        public bool TryGetPrice(QuotationContext context, OpenOrderInfo openOrder, Game game, out Quotation price)
        {
            if (game.Symbol == null)
                throw new ArgumentNullException(nameof(game), "game.Synbol should not be null.");
            var startDateTime = openOrder.ClientPostTime; //客户端提交时间。


            return context.TryGetQuotation(game.Symbol.Id, startDateTime, out price);


        }
    }
}
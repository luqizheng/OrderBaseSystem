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
        public RealTimeOpenPricePolicy()
        {
            this.Priority = 99;
        }

        /// <summary>
        /// </summary>
        public int Priority { get; }


        public string Type => "realtime";


        public bool TryGetPrice(QuotationContext context, OpenOrderInfo openOrder, Game game, out Quotation price)
        {
            if (game.Symbol == null)
                throw new ArgumentNullException(nameof(game), "game.Synbol should not be null.");
            var startDateTime = openOrder.ClientPostTime ?? openOrder.ArriveDateTime; //客户端提交时间。


            return context.TryGetQuotation(game.Symbol.Id, startDateTime, out price);
        }
    }
}
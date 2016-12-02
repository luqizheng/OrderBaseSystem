using System;
using Orders.Games;
using Orders.Quotations;

namespace Orders.Policy.PricePolicies
{
    public class BestPriceOpenPricePolicy : IOpenPricePolicy
    {
        /// <summary>
        /// </summary>
        public int Priority { get; } = 1;

        /// <summary>
        /// </summary>
        public string Message => "市价已变无法交易";

        public bool TryGetPrice(QuotationContext context, OpenOrderInfo openOrder, Game game, out Quotation price)
        {
            if (game.Symbol == null)
                throw new ArgumentNullException(nameof(game), "game.Symbol should not be null.");
            var startDateTime = openOrder.ClientPostTime; //客户端提交时间。


            var prices = context.GetQuotationsByMaxEndTime(game.Symbol.Id, startDateTime);

            price = openOrder.Direction == Direction.Down ? prices.Max() : prices.Min();

            return price != null;
        }
    }
}
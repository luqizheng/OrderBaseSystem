using System.Linq;
using Orders.Quotations;

namespace Orders.Policy.PricePolicies
{
    /// <summary>
    ///     实时报价取价策略。
    /// </summary>
    public class RealTimeOpenOpenPricePolicy : IOpenPricePolicy
    {
        /// <summary>
        /// </summary>
        public int Priority { get; } = 0;

        /// <summary>
        /// </summary>
        public string Message => "市价已变无法交易";


        public bool TryGetPrice(QuotationContext context, OpenOrderInfo openOrder, Games.Game game, out Quotation price)
        {
            var startDateTime = openOrder.ClientPostTime; //客户端提交时间。
            var arriveDateTime = openOrder.ArriveDateTime; //服务端交换时间

            var matchesPrice = context.GetQuotation(game.Symbol.Id, startDateTime, arriveDateTime);
            price = null;
            if ((matchesPrice != null) && matchesPrice.Any())
                return false;
            if (openOrder.Direction == Direction.Up)
            {
                price = matchesPrice.Max();
                return true;
            }
            price = matchesPrice.Min();
            return true;
        }
    }
}
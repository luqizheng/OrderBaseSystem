using System.Linq;
using Orders.Quotations;

namespace Orders.Policy.PricePolicies
{
    public class RealTimeCloseOpenPricePolicy : IClosePricePolicy
    {
        public int Priority { get; set; }

        public bool TryGetPrice(QuotationContext context, Order order, out Quotation price)
        {
            var matchesPrice = context.GetQuotationsInSecond(
                order.Game.Symbol.Id,
                order.CloseTime, false);
            price = null;
            if (matchesPrice.Any())
                return false;
            switch (order.Direction)
            {
                case Direction.Up:
                    price = matchesPrice.Min();
                    break;
                case Direction.Down:
                    price = matchesPrice.Max();
                    break;
            }

            return true;
        }
    }
}
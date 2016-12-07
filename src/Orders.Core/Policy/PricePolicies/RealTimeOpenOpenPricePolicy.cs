using System;
using System.Linq;
using Orders.Quotations;

namespace Orders.Policy.PricePolicies
{
    /// <summary>
    ///     实时报价取价策略。
    /// </summary>
    public class RealTimeOpenOpenPricePolicy : IOpenPricePolicy
    {
        private readonly QuotationContext _context;

        public RealTimeOpenOpenPricePolicy(QuotationContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));
            _context = context;
        }

        /// <summary>
        /// </summary>
        public int Priority { get; } = 0;

        /// <summary>
        /// </summary>
        public string Message => "市价已变无法交易";


        public bool TryGetPrice(OrderCreateDto order, out Quotation price)
        {
            var startDateTime = order.ClientPostTime; //客户端提交时间。
            var arriveDateTime = order.ArriveDateTime; //服务端交换时间

            var matchesPrice = _context.GetQuotation(order.SymbolId, startDateTime, arriveDateTime);
            price = null;
            if (matchesPrice.Any())
                return false;
            if (order.Direction == Direction.Up)
            {
                price = matchesPrice.Max();
                return true;
            }
            price = matchesPrice.Min();
            return true;
        }
    }
}
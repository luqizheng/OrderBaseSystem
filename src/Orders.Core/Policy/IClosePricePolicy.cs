using Orders.Quotations;

namespace Orders.Policy
{
    public interface IClosePricePolicy

    {
        /// <summary>
        ///     0为最高级别
        /// </summary>
        int Priority { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="order"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        bool TryGetPrice(QuotationContext context, Order order, out Quotation price);
    }
}
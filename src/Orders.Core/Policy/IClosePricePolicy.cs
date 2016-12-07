using Orders.Quotations;

namespace Orders.Policy
{
    public interface IClosePricePolicy

    {
        /// <summary>
        ///     0为最高级别
        /// </summary>
        int Priority { get; set; }

        bool TryGetPrice(QuotationContext context, Order order, out Quotation price);
    }
}
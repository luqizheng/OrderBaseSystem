using Orders.Quotations;

namespace Orders.Policy
{
    public interface IOpenPricePolicy
    {
        /// <summary>
        /// 0 为最高级
        /// </summary>
        int Priority { get; }
        string Message { get; }
        bool TryGetPrice(OrderCreateDto order, out Quotation price);
    }
}
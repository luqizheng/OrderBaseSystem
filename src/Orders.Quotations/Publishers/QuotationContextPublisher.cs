namespace Orders.Quotations.Publishers
{
    /// <summary>
    ///     接收报价并且把报价存入QuotationContext当中
    /// </summary>
    public class QuotationContextPublisher : IQuotationPublisher
    {
        private readonly QuotationContext _context;

        public QuotationContextPublisher(QuotationContext context)
        {
            _context = context;
        }

        public void Publish(Quotation quotation)
        {
            _context.Add(quotation);
        }
    }
}
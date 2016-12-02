namespace Orders.Quotations.Publishers
{
    public interface IQuotationPublisher
    {
        void Publish(Quotation quotation);
    }
}
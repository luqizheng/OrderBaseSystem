using System;

namespace Orders.Quotations
{
    public abstract class QuotationProvider : IDisposable
    {
        private readonly QuotationContext _quotationContext;

        public QuotationProvider(QuotationContext quotationContext)
        {
            _quotationContext = quotationContext;
        }
        public virtual void Dispose()
        {
        }

        public event EventHandler<Quotation> Received;

        public abstract void Start();
        public abstract void Stop();

        public virtual void OnReceived(Quotation t)
        {
            _quotationContext.Add(t);
            Received?.Invoke(this, t);
        }
    }
}
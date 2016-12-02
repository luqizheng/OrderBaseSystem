using System;

namespace Orders.Quotations.Providers
{
    public abstract class QuotationProvider : IDisposable
    {
        public virtual void Dispose()
        {
        }

        public event EventHandler<Quotation> Received;

        public abstract void Start();
        public abstract void Stop();

        public virtual void OnReceived(Quotation t)
        {
            Received?.Invoke(this, t);
        }
    }
}
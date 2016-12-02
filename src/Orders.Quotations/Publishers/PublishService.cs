using System;
using System.Threading.Tasks;
using Orders.Quotations.Providers;

namespace Orders.Quotations.Publishers
{
    public class PublishService

    {
        private readonly QuotationProvider _privider;
        private readonly IQuotationPublisher[] _publisher;

        public PublishService(QuotationProvider privider, IQuotationPublisher[] publisher)
        {
            if (privider == null) throw new ArgumentNullException(nameof(privider));
            if ((publisher == null) || (publisher.Length == 0)) throw new ArgumentNullException(nameof(publisher));
            _privider = privider;
            _publisher = publisher;
        }

        public void Start()
        {
            _privider.Start();
            _privider.Received += _privider_Received;
        }

        public void Stop()
        {
            _privider.Stop();
            _privider.Received -= _privider_Received;
        }

        private void _privider_Received(object sender, Quotation e)
        {
            foreach (var publisher in _publisher)
                Task.Run(() => { publisher.Publish(e); });
        }
    }
}
using System;
using System.Threading;
using Ornament.WebSockets;

namespace Orders.Quotations.Publishers
{
    public class WebSocketPublisher : IQuotationPublisher
    {
        private readonly WebSocketManager _manager;

        public WebSocketPublisher(WebSocketManager manager)
        {
            if (manager == null) throw new ArgumentNullException(nameof(manager));
            _manager = manager;
        }

        public void Publish(Quotation quotation)
        {
            if (quotation == null) throw new ArgumentNullException(nameof(quotation));
            var clients = _manager.GetClients();
            var content = quotation.ToClient(false);
            clients.SendTextAsnyc(content, CancellationToken.None);
        }
    }
}
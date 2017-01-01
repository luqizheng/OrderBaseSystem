using System;
using System.Threading;
using Ornament.WebSockets;
using Ornament.WebSockets.Handlers;

namespace Orders.Quotations.Publishers
{
    public class WebSocketPublisher : IQuotationPublisher
    {
        public WebSocketHandler Handler { get; set; }

        public void Publish(Quotation quotation)
        {
            if (quotation == null) throw new ArgumentNullException(nameof(quotation));
            if (Handler != null)
            {
                var clients = Handler.GetClients();
                var content = quotation.ToClient(false);
                clients.SendTextAsnyc(content, CancellationToken.None);
            }
        }
    }
}
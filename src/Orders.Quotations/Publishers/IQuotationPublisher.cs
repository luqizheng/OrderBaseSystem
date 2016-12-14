using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Quotations.Publishers
{
    public interface IQuotationPublisher
    {
        void Publish(Quotation quotation);


    }
}

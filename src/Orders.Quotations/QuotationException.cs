using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Quotations
{
    public class QuotationException : Exception
    {
        public QuotationException(string message) : base(message)
        {

        }

        public QuotationException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}

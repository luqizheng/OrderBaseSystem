using System;

namespace Orders
{
    public class CloseOrderException : OrderException
    {
        public CloseOrderException(string message) : base(message)
        {
        }

        public CloseOrderException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
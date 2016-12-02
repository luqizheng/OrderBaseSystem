using System;

namespace Orders.Stores
{
    public class UncloseOrderQueueException : Exception
    {
        public UncloseOrderQueueException(string message) : base(message)
        {
        }
    }
}
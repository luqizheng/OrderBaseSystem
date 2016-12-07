using System;

namespace Orders.Stores
{
    public class OrderQueueException : Exception
    {
        public OrderQueueException(string message) : base(message)
        {
        }
    }
}
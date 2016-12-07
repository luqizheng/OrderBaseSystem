using System;

namespace Orders
{
    public class OrderCreatingException : Exception
    {
        public OrderCreatingException(string error):base(error)
        {
            
        }
    }
}
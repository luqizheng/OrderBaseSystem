using System;

namespace Orders
{
    public class OrderCreatingException : OrderException
    {
        public OrderCreatingException(string error) : base(error)
        {

        }

        public OrderCreatingException(string error, Exception innerException)
            : base(error, innerException)
        {

        }

        public override string Message
        {
            get
            {
                if (InnerException != null)
                {
                    return base.Message + "." + InnerException.Message;
                }
                return base.Message;
            }
        }
    }


}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Notify
{
    public class IllegeAccessException:OrderException
    {
        public IllegeAccessException() : base("非法访问")
        {
        }

        public IllegeAccessException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}

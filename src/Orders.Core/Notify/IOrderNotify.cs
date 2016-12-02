using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Notify
{
    public interface IOrderNotify
    {
        void OnCreated(Order order);

        void OnCreating(OpenOrderInfo openOrderInfo);


        void OnClosing(Order order);

        void OnClosed(Order order);
    }
    /// <summary>
    /// 
    /// </summary>
    public class OrderNotify: IOrderNotify
    {
        public OrderNotify()
        {
            
        }
        public void OnCreated(Order order)
        {
            throw new NotImplementedException();
        }

        public void OnCreating(OpenOrderInfo openOrderInfo)
        {
            throw new NotImplementedException();
        }

        public void OnClosing(Order order)
        {
            throw new NotImplementedException();
        }

        public void OnClosed(Order order)
        {
            throw new NotImplementedException();
        }
    }
}

using System;
using Orders;

namespace Order.System.Models.OrderViewModels
{
    public class OrderDto
    {
        public OrderDto(Orders.Order order)
        {
            this.Id = order.Id;
            this.ClosePrice = order.CloseInfo.Price.Bid;
            this.CloseTime = order.CloseTime;
            this.OpenPrice = order.OpenInfo.OpenPrice.Bid;
            this.OpenTime = order.OpenInfo.OpenPrice.ArrivedTime.ToString("yyyy-MM-dd HH:mm:ss");
            this.Status = order.Status.ToString();
        }

        public string Id { get; set; }
        public decimal OpenPrice { get; set; }
        public string OpenTime { get; set; }
        public decimal ClosePrice { get; set; }
        public DateTime CloseTime { get; set; }
        public string Status { get; set; }
    }
}
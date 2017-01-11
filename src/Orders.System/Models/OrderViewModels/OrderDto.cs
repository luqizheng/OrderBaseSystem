using System;

namespace Order.System.Models.OrderViewModels
{
    public class OrderDto
    {
        public OrderDto(Orders.Order order)
        {
            Id = order.Id;
            ClosePrice = order.CloseInfo.Price.Bid;
            CloseTime = order.CloseTime;
            OpenPrice = order.OpenInfo.Price.Bid;
            OpenTime = order.OpenInfo.Price.ArrivedTime.ToString("yyyy-MM-dd HH:mm:ss");
            Status = order.Status.ToString();
        }

        public string Id { get; set; }
        public decimal OpenPrice { get; set; }
        public string OpenTime { get; set; }
        public decimal ClosePrice { get; set; }
        public DateTime CloseTime { get; set; }
        public string Status { get; set; }
    }
}
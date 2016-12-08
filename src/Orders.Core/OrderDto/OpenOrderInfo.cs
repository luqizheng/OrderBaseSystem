using System;
using Orders.Quotations;

namespace Orders
{
    public class OpenOrderInfo
    {
        public OpenOrderInfo()
        {
            ArriveDateTime = DateTime.Now;
        }
        /// <summary>
        /// </summary>
        public decimal Volume { get; set; }

        /// <summary>
        /// </summary>
        public Direction Direction { get; set; }

        /// <summary>
        ///     到达服务器时间
        /// </summary>
        public DateTime ArriveDateTime { get; }

        /// <summary>
        ///     客户端提交时间。
        /// </summary>
        public DateTime ClientPostTime { get; set; }

        public int GameTypeId { get; set; }
    }
}
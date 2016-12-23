using System;
using System.ComponentModel.DataAnnotations;
using Orders.Quotations;

// ReSharper disable once CheckNamespace

namespace Orders
{
    public class OpenOrderInfo
    {
        public OpenOrderInfo()
        {
            ArriveDateTime = DateTime.Now;
        }

        public decimal Volume { get; set; }

        /// <summary>
        /// </summary>
        public Direction Direction { get; set; }

        /// <summary>
        ///     到达服务器时间
        /// </summary>
        public DateTime ArriveDateTime { get; }

        /// <summary>
        ///     客户端millsisonds
        /// </summary>
        public DateTime? ClientPostTime { get; set; }

        public double RemindSeconds
        {
            get
            {
                if (ClientPostTime == null)
                    return 0;
                return (this.ArriveDateTime - ClientPostTime.Value).TotalSeconds;
            }
        }
    }
}
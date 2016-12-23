using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Orders.Quotations;

namespace Order.System.Models.OrderViewModels
{
    public class OrderCreatingInfo
    {
        public int GameId { get; set; }

        /// <summary>
        ///     客户端提交时间。
        /// </summary>
        public long? ClientTime { get; set; }

        [Required]
        /// <summary>
        /// </summary>
        public decimal Volume { get; set; }

        /// <summary>
        /// </summary>
        public Direction Direction { get; set; }
    }
}

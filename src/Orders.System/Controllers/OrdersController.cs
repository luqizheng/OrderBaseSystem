using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Order.System.Models.OrderViewModels;
using Orders;
using Orders.Stores;

namespace Order.System.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly IGameStore _gameStore;
        private readonly ILogger<OrdersController> _logger;
        private readonly OrderService _orderService;

        public OrdersController(OrderService orderService, IGameStore gameStore, ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _gameStore = gameStore;
            _logger = logger;
        }

        [HttpGet]
        public IList<OrderDto> Unclose()
        {
            return null;
        }

        // POST api/values
        [HttpPost]
        [Authorize]
        public OrderCreatedResult Post([FromBody] OrderCreatingInfo value)
        {
            var game = _gameStore.Get(value.GameId);
            if (game == null)
                throw new OrderCreatingException("找不到品种.");
            var creatingInfo = new OpenOrderInfo
            {
                ClientPostTime = value.ClientTime != null
                    ? DateTimeOffset.FromUnixTimeMilliseconds(value.ClientTime.Value).DateTime
                    : (DateTime?) null,
                Direction = value.Direction,
                Volume = value.Volume
            };

            if (creatingInfo.TransportSeconds <= 5)
            {
                _logger.LogInformation("submit order");
                var order = _orderService.CreateOrder(creatingInfo, game, User.Identity.Name);
                return new OrderCreatedResult
                {
                    Id = order.Id,
                    OpenPrice = order.OpenInfo.Price.Bid,
                    ExpireDateTime = order.CloseTime
                };
            }
            throw new OrderCreatingException("市价已经变化，请确保浏览器时间和服务器一致。");
        }
    }
}
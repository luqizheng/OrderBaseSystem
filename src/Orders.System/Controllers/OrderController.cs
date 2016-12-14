using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Orders;
using Orders.Quotations;
using Orders.Stores;

namespace Order.System.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly OpenOrderService _openOrderService;

        public OrdersController(OpenOrderService openOrderService)
        {
            _openOrderService = openOrderService;
        }
   
        // POST api/values
        [HttpPost]
        public OrderCreatedResult Post(OpenOrderInfo value)
        {
            return _openOrderService.CreateOrder(value, "demo-user");
        }

    }
}
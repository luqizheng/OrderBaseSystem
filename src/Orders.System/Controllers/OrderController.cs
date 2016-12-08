using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Orders;
using Orders.Quotations;
using Orders.Stores;

namespace Order.System.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly OpenOrderService _openOrderService;

        public OrderController(OpenOrderService openOrderService)
        {
            _openOrderService = openOrderService;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public OrderCreatedResult Post([FromBody] OpenOrderInfo value)
        {
            return _openOrderService.CreateOrder(value, "demo-user");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
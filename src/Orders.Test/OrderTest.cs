using System;
using Orders.Games;
using Orders.Quotations;
using Xunit;

namespace Orders.Test
{
    public class OrderTest
    {
        public OrderTest()
        {
            _openPrice = new Quotation(_symbol, DateTimeOffset.Now.ToUnixTimeSeconds(), DateTime.Now);
            _openPrice.Bid = 1;
            _game = new Game("分钟", _symbol)
            {
                Rate = 1
            };
        }

        private readonly Symbol _symbol = new Symbol
        {
            Code = "Test",
            Id = 1
        };

        private readonly Quotation _openPrice;
        private readonly Game _game;

        [Fact]
        public void CreateOrder_test()
        {
            var order = new Order(1, Direction.Down, "test"); 

            Assert.Equal(OrderStatus.Created, order.Status);
            Assert.Equal(1, order.Volume);
            Assert.NotEqual(DateTime.MinValue, order.CreateTime);
        }
        [Fact]
        public void OpenOrder_Test()
        {
            var order = new Order(1, Direction.Down, "test"); 

            order.Open(_openPrice, _game);

            Assert.NotNull(order.ConfirmDateTime);
            Assert.NotEqual(DateTime.MinValue, order.CreateTime);
        }
        [Fact]
        public void CloseOrder_down_lost()
        {
            var order = new Order(1, Direction.Down, "test");
            order.Open(_openPrice, _game);

            var quotation = new Quotation(_symbol, DateTimeOffset.Now.ToUnixTimeSeconds(), DateTime.Now) { Bid = 1.1m };
            order.Close(quotation);
            Assert.True(order.Profit < 0);
        }

        [Fact]
        public void CloseOrder_down_win()
        {
            var order = new Order(1, Direction.Down, "test"); // { User = "tet" };

            order.Open(_openPrice, _game);

            var c = new Quotation(_symbol, DateTimeOffset.Now.ToUnixTimeSeconds(), DateTime.Now) { Bid = 0.9m };
            order.Close(c);

            Assert.True(order.Profit > 0);
        }


        [Fact]
        public void CloseOrder_up_lost()
        {
            var order = new Order(1, Direction.Up, "test"); // { User = "tet" };

            order.Open(_openPrice, _game);

            var c = new Quotation(_symbol, DateTimeOffset.Now.ToUnixTimeSeconds(), DateTime.Now);

            c.Bid = 0.9m;
            order.Close(c);

            Assert.True(order.Profit < 0);
        }

        [Fact]
        public void CloseOrder_up_win()
        {
            var order = new Order(1, Direction.Up, "test"); // { User = "tet" };

            order.Open(_openPrice, _game);

            var c = new Quotation(_symbol, DateTimeOffset.Now.ToUnixTimeSeconds(), DateTime.Now) { Bid = 1.1m };
            order.Close(c);

            Assert.True(order.Profit > 0);
        }

        [Fact]
        public void OpenOrder()
        {
            var order = new Order(1, Direction.Down, "test"); // { User = "tet" };
            Assert.Equal(OrderStatus.Created, order.Status);
            order.Open(_openPrice, _game);

            Assert.Equal(OrderStatus.Opening, order.Status);
            Assert.Equal(_openPrice, order.OpenInfo.Price);
        }
    }
}
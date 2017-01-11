using System;
using System.Collections.Generic;
using Orders.Games;
using Orders.Quotations;
using Orders.Stores;
using Xunit;

namespace Orders.Test
{
    public class UnCloseOrderListTest
    {
        private readonly Symbol _symbol = new Symbol
        {
            Code = "Test",
            Id = 1
        };

        [Fact]
        public void Test_Order()
        {
            var expect = new List<DateTime>();
            var radm = new Random(38);
            var queuenew = new UncloseOrderQueue();
            for (var i = 0; i < 10; i++)
            {
                var order = new Order(10, Direction.Down, "123=-test")
                {

                    Id = (i + 1).ToString()
                };
                var game = new Game("Test", _symbol)
                {
                    Cycle = radm.Next(1, 120)
                };
                order.Open(new Quotation(_symbol, DateTimeOffset.Now.ToUnixTimeSeconds()), game);
                expect.Add(order.CloseTime);
                queuenew.Add(order);
            }

            expect.Sort((time, dateTime) => time.CompareTo(dateTime));
            var j = 0;
            foreach (var order in queuenew)
            {
                Assert.Equal(expect[j], order.CloseTime);
                j++;
            }
        }
    }
}
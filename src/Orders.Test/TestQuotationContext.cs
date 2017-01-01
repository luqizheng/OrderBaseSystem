using System;
using System.Linq;
using Orders.Quotations;
using Xunit;

namespace Orders.Test
{
    public class TestQuotationQueue
    {
        private readonly Symbol _symbol = new Symbol
        {
            Code = "Test",
            Id = 1
        };

        [Fact]
        public void Test_GetQuotationsByMaxEndTime()
        {
            var context = new QuotationContext();
            var providerTime = DateTimeOffset.Now.ToUnixTimeSeconds();
            var arrivedTime = DateTime.Today.AddHours(10).AddMinutes(10).AddSeconds(10);

            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(-100))
            {
                Bid = 1
            });
            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(20))
            {
                Bid = 2
            });

            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(990))
            {
                Bid = 3
            });
            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(1020))
            {
                Bid = 4
            });

            var actual = context.GetQuotationsByMaxEndTime(1, arrivedTime);

            Assert.Equal(actual.Length, 2);
            Assert.Equal(actual[0].Bid, 2);
            Assert.Equal(actual[1].Bid, 3);
        }

        [Fact]
        public void Test_RealTimeQuotation()
        {
            var context = new QuotationQueue();
            var providerTime = DateTimeOffset.Now.ToUnixTimeSeconds();
            var arrivedTime = DateTime.Now;
            context.Add(new Quotation(_symbol, providerTime, arrivedTime)
            {
                Bid = 1
            });

            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(1130))
            {
                Bid = 2
            });
            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(2330))
            {
                Bid = 3
            });

            var actual = context.GetQuotation(arrivedTime.AddMilliseconds(1500));
            Assert.NotNull(actual);
            Assert.Equal(actual.Bid, 2m);

            actual = context.GetQuotation(arrivedTime);
            Assert.NotNull(actual);
            Assert.Equal(actual.Bid, 1m);
        }

        [Fact]
        public void Test_Remove()
        {
            var context = new QuotationQueue();
            var providerTime = DateTimeOffset.Now.ToUnixTimeSeconds();
            var arrivedTime = DateTime.Now;

            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(-1001))
            {
                Bid = 1
            });
            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(20))
            {
                Bid = 2
            });

            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(990))
            {
                Bid = 3
            });
            context.Add(new Quotation(_symbol, providerTime, arrivedTime.AddMilliseconds(1020))
            {
                Bid = 4
            });

            context.Remove(1);

            Assert.Equal(3, context.Count());
        }

        [Fact]
        public void TestAddQuoataionOrder()
        {
            var context = new QuotationContext();
            var now = DateTimeOffset.Now;

            context.Add(new Quotation(_symbol, now.ToUnixTimeSeconds())
            {
                Bid = 1
            });
            context.Add(new Quotation(_symbol, now.AddMilliseconds(100).ToUnixTimeSeconds())
            {
                Bid = 2
            });
            context.Add(new Quotation(_symbol, now.AddMilliseconds(100).ToUnixTimeSeconds())
            {
                Bid = 3
            });

            var s = context.GetList(1).ToArray();
            Assert.Equal(1, s[0].Bid);
            Assert.Equal(2, s[1].Bid);
            Assert.Equal(3, s[2].Bid);
        }
    }
}
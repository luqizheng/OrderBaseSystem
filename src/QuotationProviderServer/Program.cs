using System;
using System.Collections.Generic;
using System.Text;
using Orders;
using Orders.Quotations;

using QuotationProviderServer.Stores;

namespace QuotationProviderServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            var setting = new RedistQuotationProviderSetting()
            {
                Server = "192.168.1.7",
                Port = 6379,
                Password = "123456",
                Channel = new[] { "DA_QuoteChannel" }
            };
            var provider = new RedisQuotationProvider(new SymbolStore(), setting);
            provider.Received += Provider_Received;
            provider.Start();

            Console.Read();
        }

        private static void Provider_Received(object sender, Quotation e)
        {
            Console.WriteLine(e.Symbol.Name + ":" + e.Bid);
        }
    }
}
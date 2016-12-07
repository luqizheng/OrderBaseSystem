using System;
using System.Collections.Generic;
using System.Text;
using Orders;
using Orders.Quotations;
using Orders.Quotations.RedisProvider;
using QuotationProviderServer.Stores;

namespace QuotationProviderServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            var provider = new RedisQuotationProvider(new QuotationContext(), new SymbolStore(),
                "192.168.1.7", 6379, "123456", "DA_QuoteChannel");
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
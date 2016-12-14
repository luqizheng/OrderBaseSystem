using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Stores;

namespace Orders.Quotations.RedisProvider
{
    public class RedistQuotationProviderSetting
    {
      
        public string Server { get; set; }
        public int Port { get; set; } = 6379;
        public string Password { get; set; }
        public string Channel { get; set; }
    }
}
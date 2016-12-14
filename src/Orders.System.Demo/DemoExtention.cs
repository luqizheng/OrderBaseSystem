using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;
using Orders.Quotations.Stores;
using Orders.Stores;
using Orders.System.Demo.Stores;

namespace Orders.System.Demo
{
    public static class DemoExtention
    {
        public static void AddDemo(this IServiceCollection services)
        {
            services.AddSingleton(typeof(ISymbolStore), typeof(DemoSymbloStore));
            services.AddSingleton(typeof(IOrderStore), typeof(DemoOrderStore));
            services.AddSingleton(typeof(DemoQuotationProvider), typeof(DemoQuotationProvider));
        }

    
    }
}
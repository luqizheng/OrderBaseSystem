using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;
using Orders.Quotations.Stores;
using Orders.Stores;

namespace Orders.System.Demo
{
    public static class DemoExtention
    {
        public static void AddDemo(this IServiceCollection services)
        {
            services.AddSingleton(typeof(ISymbolStore), typeof(SymbolStore));
            services.AddSingleton(typeof(IOrderStore), typeof(OrderStore));
            services.AddSingleton(typeof(QuotationProvider), typeof(DemoQuotationProvider));
        }

        public static void UseDemo(this IApplicationBuilder service)
        {
            service.ApplicationServices.GetService<QuotationProvider>().Start();
        }
    }
}
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;
using Orders.Quotations.Providers;
using Orders.Quotations.Stores;
using Orders.Stores;
using Orders.System.Demo.Stores;

namespace Orders.System.Demo
{
    public static class DemoExtention
    {
        public static void AddDemoQuotationStore(this IServiceCollection services)
        {
            services.AddSingleton(typeof(ISymbolStore), typeof(DemoSymbloStore));
            services.AddSingleton(typeof(IOrderStore), typeof(DemoOrderStore));
        }

        public static QuotationServiceBuilder AddDemoQuotationProvider(
            this QuotationServiceBuilder quotationServiceBuilder)
        {
            quotationServiceBuilder.Services.AddSingleton(typeof(QuotationProvider),
                typeof(DemoQuotationProvider));
            return quotationServiceBuilder;
        }
    }
}
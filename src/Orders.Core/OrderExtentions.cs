using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;

namespace Orders
{
    public static class OrderExtentions
    {
        public static OrdersSettingBuilder AddOrderService(this IServiceCollection services)
            //where TOrderStore : IOrderStore
            //where TSymbolStore : ISymbolStore
        {
            services.AddSingleton(new QuotationContext());
            services.AddSingleton(new OrderContext());
            return new OrdersSettingBuilder(services);
        }
    }
}
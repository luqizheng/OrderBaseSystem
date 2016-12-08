using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;

namespace Orders
{
    public static class OrderExtentions
    {
        public static OrdersSettingBuilder AddOrderService(this IServiceCollection services)
        {
            services.AddSingleton(new QuotationContext());
            services.AddSingleton(new OrderContext());
            services.AddScoped(typeof(OpenOrderService));
            return new OrdersSettingBuilder(services);
        }
    }
}
using Microsoft.Extensions.DependencyInjection;

namespace Orders
{
    public class OrdersSettingBuilder
    {
        public OrdersSettingBuilder(IServiceCollection services)
        {
            Service = services;
        }
        
        public IServiceCollection Service { get; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Orders.Stores;
using Orders.Stores.LiteDB;

namespace Orders
{
    public static class OrdersLiteDbExtentions
    {
        public static OrdersSettingBuilder AddDbLiteStore(this OrdersSettingBuilder builder)
        {
            builder.Service.AddScoped(typeof(IOrderStore), typeof(OrderStores));

            builder.Service.AddScoped(typeof(IGameStore), typeof(GameStore));
            builder.Service.AddScoped(typeof(IGameTypeStore), typeof(GameTypeStore));
            builder.Service.AddScoped(typeof(IPricePolicyStore), typeof(PricePolicyStore));

          
            builder.Service.AddScoped(typeof(IOrderPolicyStore), typeof(OrderPolicyStore));

            return builder;
        }
    }
   
}

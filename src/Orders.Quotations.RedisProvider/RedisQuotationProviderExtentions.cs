using System;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Stores;

namespace Orders.Quotations.RedisProvider
{
    public static class RedisQuotationProviderExtentions
    {
        public static IServiceCollection AddRedistQuotationService(this IServiceCollection services)
        {
            services.AddSingleton<RedisQuotatiohProviderBuilder>();
            services.AddSingleton(provider =>
            {
                var redisBuild = provider.GetService<RedisQuotatiohProviderBuilder>();
                var quotation = provider.GetService<QuotationContext>();
                var symbol = provider.GetService<ISymbolStore>();
                var redisServer = redisBuild.Build(quotation, symbol);
                return redisServer;
            });
            return services;
        }

        public static IServiceProvider UseRedistQuotationService(this IServiceProvider app,
            Action<RedisQuotatiohProviderBuilder> func)
        {
            var redist = app.GetService<RedisQuotatiohProviderBuilder>();

            func(redist);
            app.GetService<RedisQuotationProvider>().Start();
            return app;
        }
    }

    public class RedisQuotatiohProviderBuilder
    {
        public string Server { get; set; }
        public int Port { get; set; } = 6379;
        public string Password { get; set; }
        public string Channel { get; set; }
        public RedisQuotationProvider Build(QuotationContext context, ISymbolStore store)
        {
            var provider = new RedisQuotationProvider(context, store, Server, Port, Password, Channel);
            return provider;
        }
    }
}
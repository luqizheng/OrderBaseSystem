using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Providers;
using Orders.Quotations.Publishers;

// ReSharper disable once CheckNamespace

namespace Orders.Quotations
{
    public static class QuotationExtentations
    {
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public static QuotationServiceBuilder AddQuotation(this IServiceCollection services)

        {
            services.AddSingleton(new QuotationContext()); //添加报价context，用于统计和cache数据


            var setting = new QuotationServiceBuilder(services);
            services.AddSingleton(setting);

            services.AddSingleton(typeof(IQuotationPublisher), typeof(QuotationContextPublisher));

            services.AddSingleton(serviceProvider =>
            {
                var quotationProvider = serviceProvider.GetService<QuotationProvider>();
                var publisher = serviceProvider.GetServices<IQuotationPublisher>();
                return new PublishService(quotationProvider, publisher.ToArray());
            });

            return setting;
        }

        public static IServiceProvider UseQuotation(this IServiceProvider app)
        {
            app.GetService<PublishService>().Start();
            return app;
        }
    }
}
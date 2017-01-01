using Microsoft.Extensions.DependencyInjection;

// ReSharper disable once CheckNamespace

namespace Orders.Quotations
{
    public class QuotationServiceBuilder
    {
        public QuotationServiceBuilder(IServiceCollection service)
        {
            Services = service;
        }

        public IServiceCollection Services { get; }

        public string QuotationPath { get; set; }
    }
}
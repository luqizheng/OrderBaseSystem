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
        ///// </summary>

        ///// <summary>
        //public bool HasProvider { get; private set; }

        //public bool HasPublisher { get; private set; }

        ///// <summary>
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="providerFactory"></param>
        //public void AddProvider<T>(Func<T> providerFactory)
        //    where T : QuotationProvider
        //{
        //    Services.AddSingleton(providerFactory);
        //    HasProvider = true;
        //}

        ///// <summary>
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        //public void AddPublisher<T>() where T : IQuotationPublisher
        //{
        //    Services.AddSingleton(typeof(IQuotationPublisher), typeof(T));

        //}

        ///// <summary>
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="providerFactory"></param>
        //public void AddPublisher<T>(Func<T> providerFactory)
        //    where T : IQuotationPublisher
        //{
        //    Services.AddSingleton(providerFactory);
        //    HasPublisher = true;
        //}
    }
}
using System;
using Microsoft.Extensions.DependencyInjection;

namespace Orders
{
    public class OrderServiceBuilder
    {
        public OrderServiceBuilder(IServiceCollection service, bool enableOpenService, bool enableCloseSerivce)
        {
            if (service == null)
                throw new ArgumentNullException(nameof(service));
            Services = service;
            EnableOpenService = enableOpenService;
            EnableCloseSerivce = enableCloseSerivce;
        }

        public IServiceCollection Services { get; set; }
        public bool EnableOpenService { get; private set; }
        public bool EnableCloseSerivce { get; private set; }
    }
}
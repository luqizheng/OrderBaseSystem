using System;
using Microsoft.Extensions.DependencyInjection;

namespace Orders
{
    public class OrderServiceBuilder
    {
        public OrderServiceBuilder(IServiceCollection service, bool enableOpenService, bool enableCloseSerivce,string serverName)
        {
            if (service == null)
                throw new ArgumentNullException(nameof(service));
            if (serverName == null) throw new ArgumentNullException(nameof(serverName));
            Services = service;
            EnableOpenService = enableOpenService;
            EnableCloseSerivce = enableCloseSerivce;
            this.ServerName = serverName;
        }
        public string ServerName { get; set; }
        public IServiceCollection Services { get; set; }
        public bool EnableOpenService { get; private set; }
        public bool EnableCloseSerivce { get; private set; }
    }
}
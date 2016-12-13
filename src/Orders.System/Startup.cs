using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Orders;
using Orders.Quotations;
using Orders.Quotations.Publishers;
using Orders.Quotations.RedisProvider;
using Ornament.Uow;
using Orders.System.Demo;

namespace Order.System
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddOrderService() //添加订单系统
                .AddQuotationDapperStore() //添加报价存储;
                .AddRedistQuotation() //添加redis 报价服务程序
                .AddQuotationWebSocket(); //添加推送的报价

            //services.AddDbUowForSqlServer(Configuration.GetConnectionString("Conn"), true);

            //demo setting;
            services.AddDemo();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            //与业务相关的

            app.UseWebSocketQuote(); //启动WeboSockeProver
            //productor

            //Redist 订阅报价是这个系统唯一的报价器
            //app.ApplicationServices.UseRedistQuotationService(options =>
            //{
            //    options.Password = "123456";
            //    options.Server = "192.168.1.7";
            //    options.Channel = "DA_QuotaChannel";
            //});

            //demo
            app.UseDemo();


            app.ApplicationServices.UseCloseOrderService(); //启动平仓服务。
        }
    }
}
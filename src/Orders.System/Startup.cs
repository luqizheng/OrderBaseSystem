using System;
using HS.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Orders;
using Orders.Notify;
using Orders.Quotations;
using Orders.System.Demo;
using Ornament.WebSockets;

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
            services.AddOrnamentWebSocket(); //添加OrnamentWebSocket去处理WebSocket问题。



            services.AddIdentity<User, Role>()
                .AddHsIdentity()
                .AddDefaultTokenProviders();
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;

                // Cookie settings
                options.Cookies.ApplicationCookie.ExpireTimeSpan = TimeSpan.FromDays(150);
                options.Cookies.ApplicationCookie.LoginPath = "/Home/LogIn";
                options.Cookies.ApplicationCookie.LogoutPath = "/Home/LogOff";

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            //报价设置
            services.AddQuotation()
                .AddQuotationDapperStore(Configuration.GetConnectionString("Conn_Local")) //添加报价存储;
                .AddRedstiQuotationProvider(options =>
                {
                    options.Password = "123456";
                    options.Server = "192.168.1.7";
                    options.Channel = new[] { "DA_QuoteChannel" };
                }) //添加redis 报价服务程序
                .AddDemoQuotationProvider() //添加demo播放器。如果不适用请comment这调代码
                .AddWebSocketPublisher(); //添加推送的报价

            //order设置
            services.AddOrderService(true)
                .AddOrderStoreDapper(Configuration.GetConnectionString("Conn_Local")) //保存
                .AddOrderNotify();


            //demo setting;
            //services.AddDemoQuotationStore();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            env.EnvironmentName = EnvironmentName.Production;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseIdentity();

            //与业务相关的
            //Redist 订阅


            //DEMO
            //报价相关
            app.ApplicationServices.UseQuotation();
            app.UseWebSocketQuote(); //启动WeboSockeProver
            app.UseWebSocketQuotationStaus();
            //Order相关
            app.ApplicationServices.UseOrderService(); //启动平仓服务。
            app.UseWebSocketForOrderNotify("/notify/order", http => false); //启动OrderNotify,
        }
    }
}
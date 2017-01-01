using System.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Stores;
using Ornament.Uow;

namespace Orders.Quotations
{
    public static class QuotationStoreDapperExtentions
    {
        public static QuotationServiceBuilder AddQuotationDapperStore(this QuotationServiceBuilder builder,
            string connectionString)
        {
            var services = builder.Services;
            services.AddScoped(typeof(ISymbolStore), typeof(SymbolStore));
            services.AddScoped(typeof(IChartInfoStore), typeof(ChartInfoStore));
            builder.Services.AddDbUow(() =>
            {
                var conn = new SqlConnection(connectionString);
                return new QuotationUow(conn);
            });


            return builder;
        }
    }
}
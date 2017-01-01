using System.Data;
using Ornament.Uow;

namespace Orders.Quotations
{
    public class QuotationUow : DbUow
    {
        public QuotationUow(IDbConnection connection) : base(connection)
        {
        }
    }
}
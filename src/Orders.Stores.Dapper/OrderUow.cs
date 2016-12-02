using System.Data;
using Ornament.Uow;

namespace Orders
{
    public class OrderUow : DbUow
    {
        public OrderUow(IDbConnection connection) : base(connection)
        {
        }
    }
}
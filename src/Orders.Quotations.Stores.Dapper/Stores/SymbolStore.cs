using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Ornament;
using Ornament.Stores;

namespace Orders.Quotations.Stores
{
    public class SymbolStore : DbConnectionStore<Symbol, int>, ISymbolStore

    {
        public SymbolStore(QuotationUow context) : base(context)
        {
        }

        public override IQueryable<Symbol> Entities
        {
            get { throw new NotImplementedException(); }
        }

        public IEnumerable<Symbol> Symbols
        {
            get
            {
                var q = "select PK_Id as Id,Name,Symbol as Code,DotDigit Sclar from TB_Biz_Symbol where Status=1";
                return Uow.Connection.Query<Symbol>(q);
            }
        }

        public override Symbol Get(int symbolId)
        {
            var q =
                "select Id,Name,Symbol as Code,DotDigit Sclar,BoInterval from TB_Biz_Symbols where Status=1 and id=@id";
            var result = Uow.Connection.QuerySingle<Symbol>(q, new {id = symbolId});
            //test trading session
            foreach (DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
                result.TradingSession.Add(day, new List<TimePeriod>
                {
                    new TimePeriod
                    {
                        Start = new Time(),
                        End = new Time(23, 59, 59, 0)
                    }
                });
            return result;
        }


        public override void Update(Symbol t)
        {
            throw new NotImplementedException();
        }

        public override void Add(Symbol t)
        {
            throw new NotImplementedException();
        }

        public override void Delete(Symbol t)
        {
            throw new NotImplementedException();
        }
    }
}
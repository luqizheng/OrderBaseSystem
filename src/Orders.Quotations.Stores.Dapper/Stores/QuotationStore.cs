using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Ornament;
using Ornament.Uow.DbConnection;

namespace Orders.Quotations.Stores
{
    public class SymbolStore :DbUow,ISymbolStore

    {
        public SymbolStore(IDbConnection connection, bool isTranscation) : base(connection, isTranscation)
        {
        }

        public IQueryable<Symbol> Entities
        {
            get { throw new NotImplementedException(); }
        }

        public IEnumerable<Symbol> Symbols
        {
            get
            {
                var q = "select Id,Name,Symbol as Code,DotDigit Sclar from TB_Biz_Symbols where Status=1";
                return Connection.Query<Symbol>(q);
            }
        }


        public Symbol Get(int symbolId)
        {
            var q =
                "select Id,Name,Symbol as Code,DotDigit Sclar,BoInterval from TB_Biz_Symbols where Status=1 and id=@id";
            var result = Connection.QuerySingle<Symbol>(q, new {id = symbolId});
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

        public void Update(Symbol t)
        {
            throw new NotImplementedException();
        }
    }
}
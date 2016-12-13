using System;
using System.Collections.Generic;
using System.Data;
using Ornament.Uow.DbConnection;
using Dapper;

namespace Orders.Quotations.Stores
{
    public class ChartInfoStore : DbUow, IChartInfoStore
    {
        public ChartInfoStore(IDbConnection connection, bool isTranscation) : base(connection, isTranscation)
        {
        }


        public IEnumerable<ChartInfo> List(ChartInfoType type, Symbol symbol, DateTime? start, DateTime? end)
        {
            var tableName = String.Format("TB_{0}_{1}", symbol.Code, type);
            var sql = @"SELECT LocalTime ArriveTime,[Open],High,Low,[Close] FROM " + tableName +
                      " where LocalTime>=@start and LocalTime<=end";
           return Connection.Query<ChartInfo>(sql, new {start, end});
        }

        public ChartInfo GetQuoteByUnixTime(int unixTime, string tableName, Symbol symbol)
        {

            var sql = @"SELECT LocalTime ArriveTime,[Open],High,Low,[Close],FROM " + tableName +
                      " where [UnixTime]=@unixTime";

            var dbData = this.Connection.QueryFirstOrDefault<ChartInfo>(sql, new { unixTime });

            return dbData;
        }
    }
}
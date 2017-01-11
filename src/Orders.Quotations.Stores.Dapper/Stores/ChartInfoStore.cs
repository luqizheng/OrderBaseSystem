﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Ornament.Stores;

namespace Orders.Quotations.Stores
{
    public class ChartInfoStore : DbConnectionStore<ChartInfo, int>, IChartInfoStore
    {
        public ChartInfoStore(QuotationUow context) : base(context)
        {
        }



        public IEnumerable<ChartInfo> List(ChartInfoType type, Symbol symbol, DateTime? start, DateTime? end)
        {
            var tableName = string.Format("TB_{0}_{1}", symbol.Code, type);
            var sql = @"SELECT LocalTime ArriveTime,[Open],High,Low,[Close] FROM " + tableName +
                      " where LocalTime>=@start and LocalTime<=end";
            return Uow.Connection.Query<ChartInfo>(sql, new {start, end});
        }

        public ChartInfo GetQuoteByUnixTime(int unixTime, string tableName, Symbol symbol)
        {
            var sql = @"SELECT LocalTime ArriveTime,[Open],High,Low,[Close],FROM " + tableName +
                      " where [UnixTime]=@unixTime";

            var dbData = Uow.Connection.QueryFirstOrDefault<ChartInfo>(sql, new {unixTime});

            return dbData;
        }

 
    }
}
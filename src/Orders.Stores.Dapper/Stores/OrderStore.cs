using System;
using System.Collections.Generic;
using System.Data.Common;
using Dapper;
using Orders.Quotations;
using Ornament.Stores;

namespace Orders.Stores
{
    public class OrderStore : DbConnectionStore<Order, string>, IOrderStore
    {
        private readonly OrderServiceBuilder _serverBuilder;

        public OrderStore(OrderUow context, OrderServiceBuilder serverBuilder) : base(context)
        {
            _serverBuilder = serverBuilder;
        }

        public int? GetLastOrderId(string serverName)
        {
            var sql = "select MAX(MTOrder) from [TB_Biz_Trades] a where a.TradeServer=@serverName";

            return Uow.Connection.ExecuteScalar<int?>(sql, new {serverName});
        }


        public void Add(Order order)
        {
            var sql = @"
            INSERT INTO[dbo].[TB_Biz_Trades]
           ([MTOrder]
           ,[Account]
           ,[Symbol]
           ,[CMD]
           ,[VolumeBuy]
           ,[VolumeSell]
           ,[Volume]
           ,[OddsRate]
           ,[OpenTime]
           ,[OpenPrice]
           ,[CloseTime]
           ,[ClosePrice]
           ,[SL]
           ,[TP]
           ,[Profit]
           ,[Status]
           ,[Commission]
           ,[Interest]
           ,[IsClosed]
           ,[IsCancelled]
           ,[IsCreditTrade]
           ,[FromOrder]
           ,[Comment]
           ,[BizDay]
           ,[UpdateTime]
           ,[CreateTime]
           ,[boInterval]
           ,[boPercent]
           ,[OrgOpenTime]
           ,[OrgOpenPrice]
           ,[OrgCloseTime]
           ,[OrgClosePrice]
           ,[OrgProfit]
           ,[IsOpenPloyProcessed]
           ,[IsClosePloyProcessed]
           ,[TradeTerminal]
           ,[OrderGUID]
        
           ,[CommissionAgent])
     VALUES(
            @id,
            @account,
            @symbol,
            @cmd
           ,@VolumeBuy
           ,@VolumeSell
           ,@Volume
           ,@OddsRate
           ,@OpenTime
           ,@OpenPrice
           ,@CloseTime
           ,@ClosePrice
           ,@SL
           ,@TP
           ,@Profit
           ,@Status
           ,@Commission
           ,@Interest
           ,@IsClosed
           ,@IsCancelled
           ,@IsCreditTrade
           ,@FromOrder
           ,@Comment
           ,@BizDay
           ,@UpdateTime
           ,@CreateTime
           ,@boInterval
           ,@boPercent
           ,@OrgOpenTime
           ,@OrgOpenPrice
           ,@OrgCloseTime
           ,@OrgClosePrice
           ,@OrgProfit
           ,@IsOpenPloyProcessed
           ,@IsClosePloyProcessed
           ,@TradeTerminal
           ,@OrderGUID
        
           ,@CommissionAgent)";

            var inserObject = new
            {
                id = Convert.ToInt32(order.Id),
                account = Convert.ToInt32(order.User),
                symbol = order.Game.Symbol.Code,
                cmd = Convert.ToInt32(order.Direction),
                VolumeBuy = order.Direction == Direction.Down ? order.Volume : 0,
                VolumeSell = order.Direction == Direction.Up ? order.Volume : 0,
                order.Volume,
                OddsRate = order.Game.Rate,
                OpenTime = order.OpenInfo.Price.ArrivedTime,
                OpenPrice = order.OpenInfo.Price.Bid,
                CloseTime = (DateTime?) null,
                ClosePrice = 0,
                SL = 0,
                TP = 0,
                Profit = 0,
                Status = (int) order.Status,
                Commission = 0,
                Interest = 0,
                IsClosed = 0,
                IsCancelled = 0,
                IsCreditTrade = 0,
                FromOrder = 0,
                Comment = 0,
                BizDay = Convert.ToInt32(order.OpenInfo.Price.ArrivedTime.ToString("yyyyMMdd")),
                UpdateTime = DateTime.Now,
                CreateTime = DateTime.Now,
                boInterval = order.Game.Cycle,
                boPercent = order.Game.Rate,
                OrgOpenTime = (DateTime?) null,
                OrgOpenPrice = order.OpenInfo.Price.Adjusted ? order.OpenInfo.Price.SrcBid : (decimal?) null,
                OrgCloseTime = (DateTime?) null,
                OrgClosePrice = 0m,
                OrgProfit = 0m,
                IsOpenPloyProcessed = 0,
                IsClosePloyProcessed = 0,
                IsOpenPloyProce = order.OpenInfo.Price.SrcBid != 0m,
                IsClosePloyProc = 0,
                TradeTerminal = 0,
                OrderGUID = Guid.NewGuid().ToString("N"),
                CommissionAgent = 0m,
                TradeServer = _serverBuilder.ServerName
            };
            ((DbConnection) Uow.Connection).Execute(sql, inserObject);
        }


        public Order GetLastOrder(string user, int symbol)
        {
            throw new NotImplementedException();
        }


        public IEnumerable<Order> GetUncloseOrders(string user)
        {
            throw new NotImplementedException();
        }

        public void Close(Order order)
        {
            var sql = @"update tb_biz_trades set CloseTime=@closeTime,Profit=@profit
,OrgClosePrice=@OrgClosePrice,OrgClosePrice=@OrgClosePrice wehre id=@id ";
            var task = ((DbConnection) Uow.Connection).Execute(sql, new
            {
                closeTime = order.CloseTime,
                id = order.Id,
                OrgClosePrice =
                order.CloseInfo.Price.Adjusted ? order.CloseInfo.Price.SrcBid : order.CloseInfo.Price.Bid,
                order.Profit
            });
        }

        public Order Get(int id)
        {
            throw new NotImplementedException();
        }
    }
}
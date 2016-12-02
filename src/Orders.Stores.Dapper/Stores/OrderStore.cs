using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Orders.Quotations;
using Ornament.Stores;
using Ornament.Uow;

namespace Orders.Stores
{
    public class OrderStore : DbConnectionStore<Order, string>, IOrderStore
    {
        public OrderStore(OrderUow context) : base(context)
        {
        }

        public override IQueryable<Order> Entities { get; }

        public void Insert(Order order)
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
                OpenTime = order.OpenInfo.OpenPrice.ArrivedTime,
                OpenPrice = order.OpenInfo.OpenPrice.Bid,
                CloseTime = (DateTime?)null,
                ClosePrice = 0,
                SL = 0,
                TP = 0,
                Profit = 0,
                Status = (int)order.Status,
                Commission = 0,
                Interest = 0,
                IsClosed = 0,
                IsCancelled = 0,
                IsCreditTrade = 0,
                FromOrder = 0,
                Comment = 0,
                BizDay = Convert.ToInt32(order.OpenInfo.OpenPrice.ArrivedTime.ToString("yyyyMMdd")),
                UpdateTime = DateTime.Now,
                CreateTime = DateTime.Now,
                boInterval = order.Game.Cycle,
                boPercent = order.Game.Rate,
                OrgOpenTime = (DateTime?)null,
                OrgOpenPrice = order.OpenInfo.OpenPrice.Bid,
                OrgCloseTime = (DateTime?)null,
                OrgClosePrice = 0m,
                OrgProfit = 0m,
                IsOpenPloyProcessed = 0,
                IsClosePloyProcessed = 0,
                IsOpenPloyProce = order.OpenInfo.OpenPrice.SrcBid != 0m,
                IsClosePloyProc = 0,
                TradeTerminal = 0,
                OrderGUID = Guid.NewGuid().ToString("N"),
                CommissionAgent = 0m
            };

            Uow.Connection.Execute(sql, inserObject);
        }

        public override void Update(Order t)
        {
        }

        public Order GetLastOrder(string user, int symbol)
        {
            throw new NotImplementedException();
        }

        public Order GetLastOrder(string user)
        {
            throw new NotImplementedException();
        }

        public Order GetLastOrder()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> GetUncloseOrders(DateTime closeTime)
        {
            throw new NotImplementedException();
        }

        public int? GetLastOrderId(IOrderIdGenerator idGenerator)
        {
            var sql = "select MAX(MTOrder) from [TB_Biz_Trades]";
            return this.Uow.Connection.ExecuteScalar<int?>(sql);
        }

        public override void Add(Order t)
        {
            throw new NotImplementedException();
        }

        public override void Delete(Order t)
        {
            throw new NotImplementedException();
        }

        public override Order Get(string id)
        {
            throw new NotImplementedException();
        }
    }
}
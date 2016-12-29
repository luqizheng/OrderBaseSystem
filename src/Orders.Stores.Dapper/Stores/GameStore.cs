using System;
using System.Collections.Generic;
using System.Linq;
using Orders.Games;
using Orders.Quotations;
using Ornament.Stores;

namespace Orders.Stores
{
    public class GameStore : DbConnectionStore<Game, int>, IGameStore
    {
        public GameStore(OrderUow context) : base(context)
        {
        }

        public override IQueryable<Game> Entities { get; }

        public override Game Get(int gameId)
        {
            return new Game("1分钟", new Symbol {Id = 1})
            {
                Cycle = 1,
                Rate = 0.92m,
                Id = 1
            };
        }

        public IEnumerable<Game> List(Symbol symbol)
        {
            return new List<Game>
            {
                new Game("1分钟", symbol)
                {
                    Cycle = 1,
                    Rate = 0.92m,
                    Id = 1
                }
            };
        }

        public override void Update(Game t)
        {
            throw new NotImplementedException();
        }

        public override void Add(Game t)
        {
            throw new NotImplementedException();
        }

        public override void Delete(Game t)
        {
            throw new NotImplementedException();
        }
    }
}
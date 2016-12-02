using System;
using System.Collections.Generic;
using Orders.Games;
using Orders.Quotations;
using Orders.Stores;

namespace Orders.System.Demo.Stores
{
    public class DemoGameStore : IGameStore
    {
        public Game Get(int gameId)
        {
            return new Game
            {
                Cycle = 1,
                Name = "1分钟",
                Rate = 0.92m,

                Id = 1
            };
        }

        public IEnumerable<Game> List(Symbol symbol)
        {
            return new List<Game>
            {
                new Game
                {
                    Cycle = 1,
                    Name = "1分钟",
                    Rate = 0.92m,
                    Symbol = symbol,
                    Id = 1
                }
            };
        }
    }
}
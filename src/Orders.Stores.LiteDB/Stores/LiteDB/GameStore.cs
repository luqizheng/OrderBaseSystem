using System;
using System.Collections.Generic;
using Orders.Games;

namespace Orders.Stores.LiteDB
{
    public class GameStore : IGameStore
    {
        public IEnumerable<Game> FindGames(int symbolId, string user)
        {
            throw new NotImplementedException();
        }

        public Game Get(int dtoGameTypeId)
        {
            throw new NotImplementedException();
        }
    }
}
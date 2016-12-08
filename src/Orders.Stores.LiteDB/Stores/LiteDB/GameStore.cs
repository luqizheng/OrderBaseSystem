using System;
using System.Collections.Generic;
using Orders.Games;

namespace Orders.Stores.LiteDB
{
    public class GameStore : IGameStore
    {
        public IEnumerable<GameSet> GetGameSets(int symbolId, string user)
        {
            throw new NotImplementedException();
        }
    }
}
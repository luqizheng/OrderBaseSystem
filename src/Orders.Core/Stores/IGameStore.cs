using System.Collections.Generic;
using Orders.Games;
using Orders.Quotations;

namespace Orders.Stores
{
    public interface IGameStore
    {
        Game Get(int gameId);

        IEnumerable<Game> List(Symbol symbol);
    }
}
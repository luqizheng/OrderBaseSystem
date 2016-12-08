using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using Orders.Games;

namespace Orders.Stores
{
    public interface IGameStore
    {
        IEnumerable<GameSet> GetGameSets(int symbolId, string user);
    }
}
using Orders.Games;
using Orders.Quotations;

namespace Orders.Stores
{
    public interface IGameStore
    {
        Game Get(int dtoGameTypeId);
    }
}
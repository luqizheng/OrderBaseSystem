using System.Collections.Generic;
using Orders.Quotations;

namespace Orders.Games
{
    public class GameSet
    {
        private IList<GameType> _types;

        public Symbol Symbol { get; set; }

        public IList<GameType> Types
        {
            get { return _types ?? (_types = new List<GameType>()); }
            set { _types = value; }
        }
    }
}
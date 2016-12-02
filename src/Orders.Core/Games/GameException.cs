using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Games
{
    public class GameException : Exception
    {
        public GameException(string message) : base(message)
        {

        }
    }
}

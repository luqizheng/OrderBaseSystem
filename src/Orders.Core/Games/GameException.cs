using System;

namespace Orders.Games
{
    public class GameException : Exception
    {
        public GameException(string message) : base(message)
        {
        }
    }
}
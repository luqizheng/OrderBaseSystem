using System;
using System.Collections.Generic;
using Orders.Quotations;
using Ornament;

namespace Orders.Games
{
    public class Game
    {
        public Game(string name, Symbol symbol)
        {
            TimePeriods = new Dictionary<DayOfWeek, TimePeriod>();
            Symbol = symbol;
            Name = name;
            Rate = 1m;
            Cycle = 1;
        }

        [Obsolete("please use input param for game")]
        public Game()
        {
        }

        public int Id { get; set; }
        public Symbol Symbol { get; set; }

        /// <summary>
        /// </summary>
        public string Name { get; set; }

        public int Cycle { get; set; }

        public decimal Rate { get; set; }

        public IDictionary<DayOfWeek, TimePeriod> TimePeriods { get; }

        public DateTime GetCloseTime(DateTime opentime)
        {
            return opentime.AddMinutes(Cycle);
        }
    }
}
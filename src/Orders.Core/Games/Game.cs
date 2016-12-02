using System;
using System.Collections.Generic;
using Orders.Quotations;
using Ornament;

namespace Orders.Games
{
    public class Game
    {
        public int Id { get; set; }
        public Game(string name, Symbol symbol)
        {
            TimePeriods = new Dictionary<DayOfWeek, TimePeriod>();
            this.Symbol = symbol;
            this.Name = name;
        }
        [System.Obsolete("please use input param for game")]
        public Game()
        {

        }
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
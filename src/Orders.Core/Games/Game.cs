using System;
using System.Collections.Generic;
using Orders.Quotations;
using Ornament;

namespace Orders.Games
{
    public class Game
    {
        public int Id { get; set; }
        public Game()
        {
            TimePeriods = new Dictionary<DayOfWeek, TimePeriod>();
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
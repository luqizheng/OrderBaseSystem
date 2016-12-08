using System;
using System.Collections.Generic;
using Ornament;

namespace Orders.Games
{
    public class GameType
    {
        public int Id { get; set; }
        public GameType()
        {
            TimePeriods = new Dictionary<DayOfWeek, TimePeriod>();
        }

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
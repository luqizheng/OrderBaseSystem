﻿using System;

namespace Orders.Quotations
{
    public class ChartInfo
    {
        public int Id { get; set; }
        public decimal Open { get; set; }
        public decimal Close { get; set; }

        public decimal High { get; set; }

        public decimal Low { get; set; }

        public DateTime ArriveTime { get; set; }

        public Symbol Symbol { get; set; }
    }

    public enum ChartInfoType
    {
        M1,
        M5,
        M15,
        M30,
        H1,
        D1,
        W1,
        M1,
    }
}
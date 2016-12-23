﻿using System;

// ReSharper disable once CheckNamespace
namespace Orders
{
    public class OrderCreatedResult
    {
        public string Id { get; set; }
        public decimal OpenPrice { get; set; }
        public DateTime? ExpireDateTime { get; set; }
    }
}
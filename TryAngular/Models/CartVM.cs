﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TryAngular.Models
{
    public class CartVM
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public bool IsDelete { get; set; }
    }
}
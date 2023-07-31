﻿namespace WVParksCapstone.Models
{
    public class HistoricalSite
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParkId { get; set; }
        public string ImageUrl { get; set; }

        public string Description { get; set; }
        public Park Park { get; set; }
    }
}

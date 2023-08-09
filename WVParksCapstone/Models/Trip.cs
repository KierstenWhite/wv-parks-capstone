using Microsoft.AspNetCore.SignalR;

namespace WVParksCapstone.Models
{
    public class Trip
    {
        public int? Id { get; set; } 
        public int? UserId { get; set; }
        public string? TripName { get; set; }   
        public int? ParkId { get; set; }
        public int? StayId { get; set; }
        public int? TrailId { get; set; }
        public int? HistoricalSiteId { get; set; }
        public int? ActivityId { get; set; }
        public int? WaterfallId { get; set; }
        public User? User { get; set; }
        public Park? Park { get; set; }

        public Stay? Stay { get; set; }
        public Trail? Trail { get; set; }
        public HistoricalSite? HistoricalSite { get; set;}
        public Activity? Activity { get; set; }
        public Waterfall? Waterfall { get; set; }

        //Probably need to add lists here rather than just new 
    }
}

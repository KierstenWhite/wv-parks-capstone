namespace WVParksCapstone.Models
{
    public class Stay
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? NumberOfSites { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ParkId { get; set; }
        public int StayTypeId { get; set;}
        public Park Park { get; set; }
        public StayType StayType { get; set; }
    }
}

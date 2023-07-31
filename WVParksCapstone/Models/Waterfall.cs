namespace WVParksCapstone.Models
{
    public class Waterfall
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int RegionId { get; set; }
        public string ImageUrl { get; set; }
        public Region Region { get; set; }
    }
}

namespace WVParksCapstone.Models
{
    public class Trail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParkId { get; set; }
        public int? DifficultyId { get; set; }
        public string ImageUrl { get; set; }
        public int? Distance { get; set; }
        public string Description { get; set; }
        public TrailDifficulty? TrailDifficulty { get; set; }
        public Park Park { get; set; }
    }
}

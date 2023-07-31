namespace WVParksCapstone.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ParkId { get; set; }
        public int StarsId { get; set; }
        public string Review { get; set; }

        public string ImageUrl { get; set; }
        public DateTime DateOfVisit { get; set; }
        public User User { get; set; }
        public Park Park { get; set; }
        public Star Star { get; set; }
    }
}

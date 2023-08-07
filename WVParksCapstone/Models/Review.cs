namespace WVParksCapstone.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ParkId { get; set; }
        public int StarsId { get; set; }
        public string ReviewTitle { get; set; }

        public string ImageUrl { get; set; }
        public DateTime DateOfVisit { get; set; }

        //add ? so during the Add Methods, it knows it's okay to be null and not look for it since the form is just focusing on Review
        public User? User { get; set; }
        public Park? Park { get; set; }
        public StarType? StarType { get; set; }
    }
}

namespace WVParksCapstone.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string UserPhoto { get; set; }
        public bool IsAdmin { get; set; }
        public string Bio { get; set; }
        public DateTime DateCreated { get; set; }
    }
}

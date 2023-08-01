using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IReviewRepository
    {
        void Add(Review review);
        void Delete(int id);
        List<Review> GetAll();
        Review GetById(int id);
        void Update(Review review);
    }
}
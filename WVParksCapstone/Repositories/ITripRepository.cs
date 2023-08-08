using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface ITripRepository
    {
        List<Trip> GetAll();

        Trip GetById(int id);
        void Add(Trip trip);
        void Update(Trip trip);

        void Delete(int id);
    }
}
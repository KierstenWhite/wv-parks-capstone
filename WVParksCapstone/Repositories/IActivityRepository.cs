using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IActivityRepository
    {
        List<Activity> GetAll();
        Activity GetById(int id);
    }
}
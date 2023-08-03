using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IActivityRepository
    {
        List<Activity> GetAll();
        Activity GetById(int id);

        List<Activity> GetActivityByParkId(int id);

        List<Activity> GetActivityByActivityTypeId(int id);
    }
}
using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IActivityTypeRepository
    {
        List<ActivityType> GetAll();
        ActivityType GetById(int id);
    }
}
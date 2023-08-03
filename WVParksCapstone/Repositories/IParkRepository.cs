using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IParkRepository
    {
        List<Park> GetAll();
        Park GetById(int id);
        List<Park> GetParkByRegionId(int id);
    }
}
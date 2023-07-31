using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IRegionRepository
    {
        List<Region> GetAll();
        Region GetById(int id);
    }
}
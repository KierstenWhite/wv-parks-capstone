using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IStarTypeRepository
    {
        List<StarType> GetAll();
        StarType GetById(int id);
    }
}
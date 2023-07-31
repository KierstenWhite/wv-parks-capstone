using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IStayTypeRepository
    {
        List<StayType> GetAll();
        StayType GetById(int id);
    }
}
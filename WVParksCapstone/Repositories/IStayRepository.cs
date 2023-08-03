using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IStayRepository
    {
        List<Stay> GetAll();
        Stay GetById(int id);
        List<Stay> GetStayByParkId(int id);
    }
}
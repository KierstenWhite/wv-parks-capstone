using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IWaterfallRepository
    {
        List<Waterfall> GetAll();
        Waterfall GetById(int id);
    }
}
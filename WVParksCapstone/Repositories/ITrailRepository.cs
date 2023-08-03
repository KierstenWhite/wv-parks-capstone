using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface ITrailRepository
    {
        List<Trail> GetAll();
        Trail GetById(int id);
        List<Trail> GetTrailByParkId(int id);

        List<Trail> GetTrailByTrailDifficultyId(int id);
    }
}
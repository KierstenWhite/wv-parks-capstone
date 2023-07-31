using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface ITrailDifficultyRepository
    {
        List<TrailDifficulty> GetAll();
        TrailDifficulty GetById(int id);
    }
}
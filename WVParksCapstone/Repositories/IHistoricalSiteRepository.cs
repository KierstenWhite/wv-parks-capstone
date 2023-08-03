using WVParksCapstone.Models;

namespace WVParksCapstone.Repositories
{
    public interface IHistoricalSiteRepository
    {
        List<HistoricalSite> GetAll();
        HistoricalSite GetById(int id);

        List<HistoricalSite> GetHistoricalSiteByParkId(int id);
    }
}
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricalSiteController : ControllerBase
    {
        private readonly IHistoricalSiteRepository _historicalSiteRepository;
        public HistoricalSiteController(IHistoricalSiteRepository historicalSiteRepository)
        {
            _historicalSiteRepository = historicalSiteRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_historicalSiteRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var historicalSite = _historicalSiteRepository.GetById(id);
            if (historicalSite == null)
            {
                return NotFound();
            }
            return Ok(historicalSite);
        }

        [HttpGet("GetHistoricalSiteByParkId{Id}")]
        public IActionResult GetHistoricalSiteByParkId(int Id)
        {
            List<HistoricalSite> historicalSite = _historicalSiteRepository.GetHistoricalSiteByParkId(Id);
            if (historicalSite == null)
            {
                return NotFound();
            }
            return Ok(historicalSite);
        }
    }
}

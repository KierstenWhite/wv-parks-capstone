using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;
using Microsoft.Extensions.Hosting;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterfallController : ControllerBase
    {
        private readonly IWaterfallRepository _waterfallRepository;
        public WaterfallController(IWaterfallRepository waterfallRepository)
        {
            _waterfallRepository = waterfallRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_waterfallRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var waterfall = _waterfallRepository.GetById(id);
            if (waterfall == null)
            {
                return NotFound();
            }
            return Ok(waterfall);
        }

        [HttpGet("GetWaterfallByRegionId{Id}")]
        public IActionResult GetWaterfallByRegionId(int Id)
        {
            List<Waterfall> waterfalls = _waterfallRepository.GetWaterfallByRegionId(Id);
            if (waterfalls == null)
            {
                return NotFound();
            }
            return Ok(waterfalls);
        }
    }
}

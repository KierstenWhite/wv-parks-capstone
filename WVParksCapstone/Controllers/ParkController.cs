using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkController : ControllerBase
    {
        private readonly IParkRepository _parkRepository;
        public ParkController(IParkRepository parkRepository)
        {
            _parkRepository = parkRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_parkRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var park = _parkRepository.GetById(id);
            if (park == null)
            {
                return NotFound();
            }
            return Ok(park);
        }

        [HttpGet("GetParkByRegionId{Id}")]
        public IActionResult GetParkByRegionId(int Id)
        {
            List<Park> park = _parkRepository.GetParkByRegionId(Id);
            if (park == null)
            {
                return NotFound();
            }
            return Ok(park);
        }
    }
}

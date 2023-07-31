using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly IRegionRepository _regionRepository;
        public RegionController(IRegionRepository regionRepository)
        {
            _regionRepository = regionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_regionRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var region = _regionRepository.GetById(id);
            if (region == null)
            {
                return NotFound();
            }
            return Ok(region);
        }
    }
}

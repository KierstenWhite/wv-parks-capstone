using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StarTypeController : ControllerBase
    {
        private readonly IStarTypeRepository _starTypeRepository;
        public StarTypeController(IStarTypeRepository starTypeRepository)
        {
            _starTypeRepository = starTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_starTypeRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var starType = _starTypeRepository.GetById(id);
            if (starType == null)
            {
                return NotFound();
            }
            return Ok(starType);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrailController : ControllerBase
    {
        private readonly ITrailRepository _trailRepository;
        public TrailController(ITrailRepository trailRepository)
        {
            _trailRepository = trailRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_trailRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var trail = _trailRepository.GetById(id);
            if (trail == null)
            {
                return NotFound();
            }
            return Ok(trail);
        }
    }
}

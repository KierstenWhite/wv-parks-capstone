using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrailDifficultyController : ControllerBase
    {
        private readonly ITrailDifficultyRepository _trailDifficultyRepository;
        public TrailDifficultyController(ITrailDifficultyRepository trailDifficultyRepository)
        {
            _trailDifficultyRepository = trailDifficultyRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_trailDifficultyRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var trailDifficulty = _trailDifficultyRepository.GetById(id);
            if (trailDifficulty == null)
            {
                return NotFound();
            }
            return Ok(trailDifficulty);
        }
    }
}

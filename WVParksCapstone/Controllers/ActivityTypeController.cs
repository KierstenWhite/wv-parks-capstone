using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityTypeController : ControllerBase
    {
        private readonly IActivityTypeRepository _activityTypeRepository;
        public ActivityTypeController(IActivityTypeRepository activityTypeRepository)
        {
            _activityTypeRepository = activityTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_activityTypeRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var activityType = _activityTypeRepository.GetById(id);
            if (activityType == null)
            {
                return NotFound();
            }
            return Ok(activityType);
        }
    }
}

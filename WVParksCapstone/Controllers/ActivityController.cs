using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepository _activityRepository;
        public ActivityController(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_activityRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var activity = _activityRepository.GetById(id);
            if (activity == null)
            {
                return NotFound();
            }
            return Ok(activity);
        }

        [HttpGet("GetActivityByParkId{Id}")]
        public IActionResult GetActivityByParkId(int Id)
        {
            List<Activity> activity = _activityRepository.GetActivityByParkId(Id);
            if (activity == null)
            {
                return NotFound();
            }
            return Ok(activity);
        }

        [HttpGet("GetActivityByActivityTypeId{Id}")]
        public IActionResult GetActivityByActivityTypeId(int Id)
        {
            List<Activity> activity = _activityRepository.GetActivityByActivityTypeId(Id);
            if (activity == null)
            {
                return NotFound();
            }
            return Ok(activity);
        }
    }
}

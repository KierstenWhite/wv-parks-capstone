using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StayController : ControllerBase
    {
        private readonly IStayRepository _stayRepository;
        public StayController(IStayRepository stayRepository)
        {
            _stayRepository = stayRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stayRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var stay = _stayRepository.GetById(id);
            if (stay == null)
            {
                return NotFound();
            }
            return Ok(stay);
        }
    }
}

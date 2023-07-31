using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StayTypeController : ControllerBase
    {
        private readonly IStayTypeRepository _stayTypeRepository;
        public StayTypeController(IStayTypeRepository stayTypeRepository)
        {
            _stayTypeRepository = stayTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stayTypeRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var stayType = _stayTypeRepository.GetById(id);
            if (stayType == null)
            {
                return NotFound();
            }
            return Ok(stayType);
        }
    }
}

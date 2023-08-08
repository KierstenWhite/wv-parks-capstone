using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WVParksCapstone.Repositories;
using WVParksCapstone.Models;

namespace WVParksCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripRepository _tripRepository;
        public TripController(ITripRepository tripRepository)
        {
            _tripRepository = tripRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tripRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var trip = _tripRepository.GetById(id);
            if (trip == null)
            {
                return NotFound();
            }
            return Ok(trip);
        }

        [HttpPost]
        public IActionResult Trip(Trip trip)
        {
            _tripRepository.Add(trip);
            return CreatedAtAction("Get", new { id = trip.Id }, trip);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Trip trip)
        {
            if (id != trip.Id)
            {
                return BadRequest();
            }

            _tripRepository.Update(trip);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tripRepository.Delete(id);
            return NoContent();
        }
    }
}

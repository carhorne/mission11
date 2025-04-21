using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Bookstore.API.Data;

namespace EntertainmentAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainmentAgencyContext _context;

        public EntertainersController(EntertainmentAgencyContext context)
        {
            _context = context;
        }

        // GET: api/entertainers
        [HttpGet]
        public IActionResult GetEntertainersSummary()
        {
            // Bring engagements into memory
            var engagements = _context.Engagements.ToList();

            var entertainers = _context.Entertainers
                .ToList() // Also bring entertainers into memory so we can fully use C#
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    BookingCount = engagements.Count(en => en.EntertainerID == e.EntertainerID),
                    LastBookingDate = engagements
                        .Where(en => en.EntertainerID == e.EntertainerID && DateTime.TryParse(en.StartDate, out _))
                        .Select(en => DateTime.Parse(en.StartDate!))
                        .OrderByDescending(d => d)
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(entertainers);
        }


        // GET: api/entertainers/5
        [HttpGet("{id}")]
        public IActionResult GetEntertainerById(int id)
        {
            var entertainer = _context.Entertainers.Find(id);
            if (entertainer == null)
                return NotFound();

            return Ok(entertainer);
        }

        // POST: api/entertainers
        [HttpPost]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();
            return Ok(newEntertainer);
        }

        // PUT: api/entertainers/5
        [HttpPut("{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            var existing = _context.Entertainers.Find(id);
            if (existing == null) return NotFound();

            _context.Entry(existing).CurrentValues.SetValues(updated);
            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/entertainers/5
        [HttpDelete("{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var entertainer = _context.Entertainers.Find(id);
            if (entertainer == null) return NotFound();

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();
            return NoContent();
        }
    }
}

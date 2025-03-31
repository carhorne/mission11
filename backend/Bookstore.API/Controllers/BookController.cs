using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("paged")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? types = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (types != null && types.Any())
            {
                query = query.Where(b => types.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            // Sort by title
            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            var books = query
                .Skip(pageSize * (pageNum - 1))
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(result);
        }

        [HttpGet("types")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => new { b.Category })
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
    }
}

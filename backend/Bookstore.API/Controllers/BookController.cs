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

    [HttpPost("Add")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _bookContext.Books.Add(newBook);
        _bookContext.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookID}")]
    public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
    {
        var existingBook = _bookContext.Books.Find(bookID);

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _bookContext.Books.Update(existingBook);
        _bookContext.SaveChanges();

        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookID}")]
    public IActionResult DeleteBook(int bookID)
    {
        var book = _bookContext.Books.Find(bookID);

        if (book == null)
        {
            return NotFound(new {message = "Book not found"});
        }

        _bookContext.Books.Remove(book);
        _bookContext.SaveChanges();

        return NoContent();
    }

    }
}

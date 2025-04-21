using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Data
{
    public class EntertainmentAgencyContext : DbContext
    {
        public EntertainmentAgencyContext(DbContextOptions<EntertainmentAgencyContext> options) : base(options)
        {
        }

        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; }

        // Add other tables if needed:
        // public DbSet<Agent> Agents { get; set; }
        // public DbSet<Customer> Customers { get; set; }
    }
}

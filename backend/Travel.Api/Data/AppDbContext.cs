using Microsoft.EntityFrameworkCore;
using Travel.Api.Models;

namespace Travel.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Destination> Destinations => Set<Destination>();
        public DbSet<UnavailableDate> UnavailableDates => Set<UnavailableDate>();
        public DbSet<Booking> Bookings => Set<Booking>();
    }
}




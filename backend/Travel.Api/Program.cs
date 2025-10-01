using Microsoft.EntityFrameworkCore;
using Travel.Api;
using Travel.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite("Data Source=travel.db"));
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

app.UseCors();

app.UseSwagger();
app.UseSwaggerUI();

// Migrate and seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
    await Seed.Run(db);
}

app.MapGet("/api/destinations", async (AppDbContext db) =>
    await db.Destinations.AsNoTracking().ToListAsync());

app.MapGet("/api/availability", async (AppDbContext db, int destinationId, DateOnly startDate, DateOnly endDate) =>
{
    var blocked = await db.UnavailableDates
        .Where(u => u.DestinationId == destinationId && u.Date >= startDate && u.Date <= endDate)
        .Select(u => u.Date)
        .ToListAsync();
    var available = blocked.Count == 0;
    return Results.Json(new { destinationId, available, unavailableDates = blocked.Select(d => d.ToString("yyyy-MM-dd")) });
});

app.MapPost("/api/book", async (AppDbContext db, BookingDto dto) =>
{
    var nights = (dto.EndDate.ToDateTime(TimeOnly.MinValue) - dto.StartDate.ToDateTime(TimeOnly.MinValue)).Days;
    var dest = await db.Destinations.FindAsync(dto.DestinationId);
    if (dest is null) return Results.NotFound();
    var total = Math.Max(1, nights) * dest.PricePerNight;
    var booking = new Booking
    {
        DestinationId = dto.DestinationId,
        StartDate = dto.StartDate,
        EndDate = dto.EndDate,
        Travelers = dto.Travelers,
        FullName = dto.FullName,
        Email = dto.Email,
        TotalPrice = total,
        Currency = "INR"
    };
    db.Bookings.Add(booking);
    await db.SaveChangesAsync();
    return Results.Json(new { bookingId = booking.Id.ToString("N"), totalPrice = total, currency = booking.Currency });
});

app.Run();

namespace Travel.Api
{
    public record BookingDto(int DestinationId, DateOnly StartDate, DateOnly EndDate, int Travelers, string FullName, string Email);
}



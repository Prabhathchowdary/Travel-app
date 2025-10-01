namespace Travel.Api.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int PricePerNight { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Highlights { get; set; } = string.Empty; // JSON string
        public string BestTime { get; set; } = string.Empty;
    }

    public class UnavailableDate
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public DateOnly Date { get; set; }
    }

    public class Booking
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int DestinationId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int Travelers { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int TotalPrice { get; set; }
        public string Currency { get; set; } = "INR";
    }
}




using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Travel.Api.Models;

namespace Travel.Api.Data
{
    public static class Seed
    {
        public static async Task Run(AppDbContext db)
        {
            if (await db.Destinations.AnyAsync()) return;

            var destinations = new List<Destination>
            {
                new() { 
                    Id=1, Name="Visakhapatnam", State="Andhra Pradesh", Country="India", 
                    Description="Seaside city known for pristine beaches, Araku Valley hills, and vibrant port culture.", 
                    ImageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop", 
                    PricePerNight=4500,
                    Category="Beach & Hills",
                    Highlights=JsonSerializer.Serialize(new[] {"RK Beach", "Araku Valley", "Kailasagiri", "Simhachalam Temple"}),
                    BestTime="October to March"
                },
                new() { 
                    Id=2, Name="Tirupati", State="Andhra Pradesh", Country="India", 
                    Description="Sacred spiritual destination home to the famous Tirumala Venkateswara Temple.", 
                    ImageUrl="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop", 
                    PricePerNight=3800,
                    Category="Temple & Spiritual",
                    Highlights=JsonSerializer.Serialize(new[] {"Tirumala Temple", "Sri Venkateswara National Park", "Kapila Theertham", "Chandragiri Fort"}),
                    BestTime="September to March"
                },
                new() { 
                    Id=3, Name="Vijayawada", State="Andhra Pradesh", Country="India", 
                    Description="Bustling city on the banks of Krishna river with rich cultural heritage.", 
                    ImageUrl="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop", 
                    PricePerNight=3600,
                    Category="Cultural & Heritage",
                    Highlights=JsonSerializer.Serialize(new[] {"Krishna River", "Kanaka Durga Temple", "Undavalli Caves", "Bhavani Island"}),
                    BestTime="October to March"
                },
                new() { 
                    Id=4, Name="Goa", State="Goa", Country="India", 
                    Description="Tropical paradise with pristine beaches, vibrant nightlife, and Portuguese colonial charm.", 
                    ImageUrl="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop", 
                    PricePerNight=5200,
                    Category="Beach & Nightlife",
                    Highlights=JsonSerializer.Serialize(new[] {"Calangute Beach", "Old Goa Churches", "Dudhsagar Falls", "Anjuna Flea Market"}),
                    BestTime="November to March"
                },
                new() { 
                    Id=5, Name="Munnar", State="Kerala", Country="India", 
                    Description="Hill station paradise with endless tea gardens, misty mountains, and cool climate.", 
                    ImageUrl="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop", 
                    PricePerNight=4000,
                    Category="Hills & Nature",
                    Highlights=JsonSerializer.Serialize(new[] {"Tea Gardens", "Eravikulam National Park", "Mattupetty Dam", "Echo Point"}),
                    BestTime="September to May"
                },
                new() { 
                    Id=6, Name="Jaipur", State="Rajasthan", Country="India", 
                    Description="The Pink City with magnificent forts, palaces, and rich royal heritage.", 
                    ImageUrl="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop", 
                    PricePerNight=4800,
                    Category="Heritage & Royal",
                    Highlights=JsonSerializer.Serialize(new[] {"Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar"}),
                    BestTime="October to March"
                },
            };

            db.Destinations.AddRange(destinations);

            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var blocks = new List<UnavailableDate>();
            foreach (var d in destinations)
            {
                for (int i = 1; i <= 3; i++)
                {
                    blocks.Add(new UnavailableDate { DestinationId = d.Id, Date = today.AddDays(i * 7) });
                }
            }

            db.UnavailableDates.AddRange(blocks);
            await db.SaveChangesAsync();
        }
    }
}




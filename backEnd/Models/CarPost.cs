namespace BackEnd.Models;

public class CarPost
{
    public long Id { get; set; }
    public long OwnerId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string CarType { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string Model { get; set; } = null!;
    public short Year { get; set; }
    public string Transmission { get; set; } = null!;
    public string Location { get; set; } = null!;
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public decimal PricePerDay { get; set; }
    public string PostStatus { get; set; } = null!;
    public string CarStatus { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public CarOwner Owner { get; set; } = null!;
    public ICollection<CarImage> CarImages { get; set; } = new List<CarImage>();
    public ICollection<AvailabilityCalendar> AvailabilityCalendars { get; set; } = new List<AvailabilityCalendar>();
    public ICollection<RentalRequest> RentalRequests { get; set; } = new List<RentalRequest>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}

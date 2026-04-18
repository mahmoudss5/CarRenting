namespace BackEnd.DTOs.Car;

public class CarListItemDto
{
    public long PostId { get; set; }
    public string Title { get; set; } = null!;
    public string CarType { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string Model { get; set; } = null!;
    public short Year { get; set; }
    public string Transmission { get; set; } = null!;
    public string Location { get; set; } = null!;
    public decimal RentalPrice { get; set; }
    public string RentalStatus { get; set; } = null!;
    public string OwnerName { get; set; } = null!;
    public double AverageRating { get; set; }
    public string? PrimaryImageUrl { get; set; }
}

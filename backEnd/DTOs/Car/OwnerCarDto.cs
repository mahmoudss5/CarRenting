namespace BackEnd.DTOs.Car;

public class OwnerCarDto
{
    public long PostId { get; set; }
    public string Title { get; set; } = null!;
    public string ApprovalStatus { get; set; } = null!;
    public string RentalStatus { get; set; } = null!;
    public decimal RentalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Additional fields for the frontend to avoid N+1 API calls
    public string CarType { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string Model { get; set; } = null!;
    public short Year { get; set; }
    public string Transmission { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string? PrimaryImageUrl { get; set; }
}

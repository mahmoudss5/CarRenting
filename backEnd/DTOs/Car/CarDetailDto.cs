namespace BackEnd.DTOs.Car;

public class CarDetailDto
{
    public long PostId { get; set; }
    public string OwnerName { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string CarType { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string Model { get; set; } = null!;
    public short Year { get; set; }
    public string Transmission { get; set; } = null!;
    public string Location { get; set; } = null!;
    public decimal RentalPrice { get; set; }
    public string RentalStatus { get; set; } = null!;
    public string ApprovalStatus { get; set; } = null!;
    public List<DateOnly> Availability { get; set; } = new();
    public List<CarReviewItemDto> Reviews { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

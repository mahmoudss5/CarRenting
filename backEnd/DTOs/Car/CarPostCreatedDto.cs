namespace BackEnd.DTOs.Car;

public class CarPostCreatedDto
{
    public string Message { get; set; } = null!;
    public CarPostSummaryDto Post { get; set; } = null!;
}

public class CarPostSummaryDto
{
    public long PostId { get; set; }
    public string Title { get; set; } = null!;
    public string ApprovalStatus { get; set; } = null!;
    public string RentalStatus { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}

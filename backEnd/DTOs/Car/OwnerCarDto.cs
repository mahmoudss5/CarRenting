namespace BackEnd.DTOs.Car;

public class OwnerCarDto
{
    public long PostId { get; set; }
    public string Title { get; set; } = null!;
    public string ApprovalStatus { get; set; } = null!;
    public string RentalStatus { get; set; } = null!;
    public decimal RentalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
}

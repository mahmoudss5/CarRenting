namespace BackEnd.DTOs.Rental;

public class RentalDetailDto
{
    public long RequestId { get; set; }
    public string RenterName { get; set; } = null!;
    public string CarTitle { get; set; } = null!;
    public long PostId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public DateTime RequestedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

namespace BackEnd.DTOs.Rental;

public class AdminRentalDto
{
    public long RequestId { get; set; }
    public string RenterName { get; set; } = null!;
    public string CarTitle { get; set; } = null!;
    public string OwnerName { get; set; } = null!;
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public DateTime RequestedAt { get; set; }
}

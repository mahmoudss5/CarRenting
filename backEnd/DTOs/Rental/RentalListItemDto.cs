namespace BackEnd.DTOs.Rental;

public class RentalListItemDto
{
    public long RequestId { get; set; }
    public string CarTitle { get; set; } = null!;
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public DateTime RequestedAt { get; set; }
}

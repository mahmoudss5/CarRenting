namespace BackEnd.Models;

public class RentalRequest
{
    public long Id { get; set; }
    public long RenterId { get; set; }
    public long CarPostId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public short TotalDays { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public string? RejectionReason { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public Renter Renter { get; set; } = null!;
    public CarPost CarPost { get; set; } = null!;
    public ICollection<RentalStatusLog> StatusLogs { get; set; } = new List<RentalStatusLog>();
    public Review? Review { get; set; }
}

namespace BackEnd.Models;

public class RentalStatusLog
{
    public long Id { get; set; }
    public long RentalRequestId { get; set; }
    public string FromStatus { get; set; } = null!;
    public string ToStatus { get; set; } = null!;
    public long ChangedByUserId { get; set; }
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public RentalRequest RentalRequest { get; set; } = null!;
    public User ChangedByUser { get; set; } = null!;
}

namespace BackEnd.Models;

public class Review
{
    public long Id { get; set; }
    public long RentalRequestId { get; set; }
    public long ReviewerId { get; set; }
    public long CarPostId { get; set; }
    public byte Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public RentalRequest RentalRequest { get; set; } = null!;
    public User Reviewer { get; set; } = null!;
    public CarPost CarPost { get; set; } = null!;
}

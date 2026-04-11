namespace BackEnd.DTOs.Review;

public class ReviewItemDto
{
    public long ReviewId { get; set; }
    public string RenterName { get; set; } = null!;
    public byte Rating { get; set; }
    public string? Feedback { get; set; }
    public DateTime CreatedAt { get; set; }
}

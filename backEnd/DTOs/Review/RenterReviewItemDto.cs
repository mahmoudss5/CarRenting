namespace BackEnd.DTOs.Review;

public class RenterReviewItemDto
{
    public long ReviewId { get; set; }
    public string CarTitle { get; set; } = null!;
    public byte Rating { get; set; }
    public string? Feedback { get; set; }
    public DateTime CreatedAt { get; set; }
}

namespace BackEnd.DTOs.Review;

public class CarReviewsResponseDto
{
    public long PostId { get; set; }
    public double AverageRating { get; set; }
    public List<ReviewItemDto> Reviews { get; set; } = new();
    public int Total { get; set; }
}

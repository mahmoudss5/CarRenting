namespace BackEnd.DTOs.Review;

public class ReviewCreatedResponseDto
{
    public string Message { get; set; } = null!;
    public ReviewDataDto Review { get; set; } = null!;
}

public class ReviewDataDto
{
    public long ReviewId { get; set; }
    public long PostId { get; set; }
    public string RenterName { get; set; } = null!;
    public byte Rating { get; set; }
    public string? Feedback { get; set; }
    public DateTime CreatedAt { get; set; }
}

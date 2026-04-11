namespace BackEnd.DTOs.Car;

public class CarReviewItemDto
{
    public string RenterName { get; set; } = null!;
    public byte Rating { get; set; }
    public string? Feedback { get; set; }
    public DateTime CreatedAt { get; set; }
}

using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Review;

public class CreateReviewRequestDto
{
    [Required] public long RequestId { get; set; }
    [Required] public long PostId { get; set; }
    [Required, Range(1, 5)] public byte Rating { get; set; }
    public string? Feedback { get; set; }
}

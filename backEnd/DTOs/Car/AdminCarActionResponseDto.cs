namespace BackEnd.DTOs.Car;

public class AdminCarActionResponseDto
{
    public string Message { get; set; } = null!;
    public long PostId { get; set; }
    public string ApprovalStatus { get; set; } = null!;
}

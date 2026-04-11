namespace BackEnd.DTOs.User;

public class UserActionResponseDto
{
    public string Message { get; set; } = null!;
    public long UserId { get; set; }
    public string Status { get; set; } = null!;
}

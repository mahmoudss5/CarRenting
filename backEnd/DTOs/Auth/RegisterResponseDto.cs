namespace BackEnd.DTOs.Auth;

public class RegisterResponseDto
{
    public string Message { get; set; } = null!;
    public UserAuthDto User { get; set; } = null!;
}

namespace BackEnd.DTOs.Auth;

public class LoginResponseDto
{
    public string Token { get; set; } = null!;
    public UserAuthDto User { get; set; } = null!;
}

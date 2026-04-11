namespace BackEnd.DTOs.License;

public class LicenseSubmittedResponseDto
{
    public string Message { get; set; } = null!;
    public LicenseResponseDto License { get; set; } = null!;
}

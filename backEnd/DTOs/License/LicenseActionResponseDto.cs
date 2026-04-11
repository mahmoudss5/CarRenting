namespace BackEnd.DTOs.License;

public class LicenseActionResponseDto
{
    public string Message { get; set; } = null!;
    public long LicenseId { get; set; }
    public string VerificationStatus { get; set; } = null!;
}

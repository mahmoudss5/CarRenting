namespace BackEnd.DTOs.License;

public class LicenseResponseDto
{
    public long LicenseId { get; set; }
    public string LicenseNumber { get; set; } = null!;
    public string IssuingCountry { get; set; } = null!;
    public DateOnly ExpiryDate { get; set; }
    public string? FrontImageUrl { get; set; }
    public string? BackImageUrl { get; set; }
    public string VerificationStatus { get; set; } = null!;
    public DateTime SubmittedAt { get; set; }
}

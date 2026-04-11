namespace BackEnd.DTOs.License;

public class AdminLicenseItemDto
{
    public long LicenseId { get; set; }
    public string RenterName { get; set; } = null!;
    public string LicenseNumber { get; set; } = null!;
    public string IssuingCountry { get; set; } = null!;
    public DateOnly ExpiryDate { get; set; }
    public string VerificationStatus { get; set; } = null!;
    public DateTime SubmittedAt { get; set; }
}

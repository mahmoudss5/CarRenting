namespace BackEnd.Models;

public class DriverLicense
{
    public long Id { get; set; }
    public long RenterId { get; set; }
    public string LicenseNumber { get; set; } = null!;
    public string IssuingCountry { get; set; } = null!;
    public DateOnly ExpiryDate { get; set; }
    public string FrontImageUrl { get; set; } = "";
    public string BackImageUrl { get; set; } = "";
    public string VerificationStatus { get; set; } = "Pending"; // Pending, Verified, Rejected
    public DateTime? VerifiedAt { get; set; }
    public long? VerifiedByAdminId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public Renter Renter { get; set; } = null!;
    public User? VerifiedByAdmin { get; set; }
}

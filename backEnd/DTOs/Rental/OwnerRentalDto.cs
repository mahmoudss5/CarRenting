namespace BackEnd.DTOs.Rental;

public class OwnerRentalDto
{
    public long RequestId { get; set; }
    public string RenterName { get; set; } = null!;
    public string CarTitle { get; set; } = null!;
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public DateTime RequestedAt { get; set; }

    // Renter's license info — owner reviews this when accepting/rejecting
    public string? LicenseNumber { get; set; }
    public string? LicenseIssuingCountry { get; set; }
    public DateOnly? LicenseExpiryDate { get; set; }
    public string? LicenseStatus { get; set; }
    public string? LicenseFrontImageUrl { get; set; }
    public string? LicenseBackImageUrl { get; set; }
}

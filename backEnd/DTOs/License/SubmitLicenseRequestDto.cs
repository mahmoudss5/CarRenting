using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.License;

public class SubmitLicenseRequestDto
{
    [Required] public string LicenseNumber { get; set; } = null!;
    [Required] public string IssuingCountry { get; set; } = null!;
    [Required] public DateOnly ExpiryDate { get; set; }
}

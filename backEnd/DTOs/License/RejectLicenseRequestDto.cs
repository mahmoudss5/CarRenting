using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.License;

public class RejectLicenseRequestDto
{
    [Required] public string Reason { get; set; } = null!;
}

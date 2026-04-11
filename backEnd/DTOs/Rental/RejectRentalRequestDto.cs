using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Rental;

public class RejectRentalRequestDto
{
    [Required] public string Reason { get; set; } = null!;
}

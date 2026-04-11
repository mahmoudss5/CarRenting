using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Rental;

public class CreateRentalRequestDto
{
    [Required] public long PostId { get; set; }
    [Required] public DateOnly StartDate { get; set; }
    [Required] public DateOnly EndDate { get; set; }
}

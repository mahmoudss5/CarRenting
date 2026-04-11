using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Availability;

public class AvailabilityItemDto
{
    [Required] public DateOnly Date { get; set; }
    [Required] public bool IsAvailable { get; set; }
}

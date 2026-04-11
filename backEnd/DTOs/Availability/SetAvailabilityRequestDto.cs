using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Availability;

public class SetAvailabilityRequestDto
{
    [Required] public List<AvailabilityItemDto> Dates { get; set; } = new();
}

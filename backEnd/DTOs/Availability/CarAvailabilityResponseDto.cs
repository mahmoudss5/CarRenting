namespace BackEnd.DTOs.Availability;

public class CarAvailabilityResponseDto
{
    public long PostId { get; set; }
    public List<AvailabilityItemDto> Availability { get; set; } = new();
}

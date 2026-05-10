namespace BackEnd.DTOs.Availability;

public class CarAvailabilityResponseDto
{
    public long PostId { get; set; }
    public List<AvailabilityItemDto> Availability { get; set; } = new();
    /// <summary>ISO yyyy-MM-dd dates that cannot be booked (owner-blocked + accepted rental ranges).</summary>
    public List<string> UnavailableDates { get; set; } = new();
}

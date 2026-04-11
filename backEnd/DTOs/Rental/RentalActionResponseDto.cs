namespace BackEnd.DTOs.Rental;

public class RentalActionResponseDto
{
    public string Message { get; set; } = null!;
    public long RequestId { get; set; }
    public string Status { get; set; } = null!;
    public string? CarRentalStatus { get; set; }
}

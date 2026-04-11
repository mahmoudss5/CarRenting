namespace BackEnd.DTOs.Rental;

public class RentalCreatedResponseDto
{
    public string Message { get; set; } = null!;
    public RentalDataDto Rental { get; set; } = null!;
}

public class RentalDataDto
{
    public long RequestId { get; set; }
    public long PostId { get; set; }
    public long RenterId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = null!;
    public DateTime RequestedAt { get; set; }
}

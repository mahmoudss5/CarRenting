namespace BackEnd.DTOs.Car;

public class PendingCarDto
{
    public long PostId { get; set; }
    public string OwnerName { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string CarType { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string Location { get; set; } = null!;
    public decimal RentalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
}

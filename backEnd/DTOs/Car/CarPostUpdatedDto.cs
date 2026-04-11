namespace BackEnd.DTOs.Car;

public class CarPostUpdatedDto
{
    public string Message { get; set; } = null!;
    public CarPostUpdateResultDto Post { get; set; } = null!;
}

public class CarPostUpdateResultDto
{
    public long PostId { get; set; }
    public string Title { get; set; } = null!;
    public decimal RentalPrice { get; set; }
    public string Location { get; set; } = null!;
    public DateTime UpdatedAt { get; set; }
}

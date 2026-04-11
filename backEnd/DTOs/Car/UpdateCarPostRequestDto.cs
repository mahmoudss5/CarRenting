namespace BackEnd.DTOs.Car;

public class UpdateCarPostRequestDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal? RentalPrice { get; set; }
    public string? Location { get; set; }
    public string? Transmission { get; set; }
}

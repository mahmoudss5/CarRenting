using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Car;

public class CreateCarPostRequestDto
{
    [Required] public string Title { get; set; } = null!;
    public string? Description { get; set; }
    [Required] public string CarType { get; set; } = null!;
    [Required] public string Brand { get; set; } = null!;
    [Required] public string Model { get; set; } = null!;
    [Required] public short Year { get; set; }
    [Required] public string Transmission { get; set; } = null!;
    [Required] public string Location { get; set; } = null!;
    [Required, Range(0.01, double.MaxValue)] public decimal RentalPrice { get; set; }
}

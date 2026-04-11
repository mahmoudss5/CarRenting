using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.Car;

public class RejectCarRequestDto
{
    [Required] public string Reason { get; set; } = null!;
}

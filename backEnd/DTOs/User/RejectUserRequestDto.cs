using System.ComponentModel.DataAnnotations;

namespace BackEnd.DTOs.User;

public class RejectUserRequestDto
{
    [Required] public string Reason { get; set; } = null!;
}

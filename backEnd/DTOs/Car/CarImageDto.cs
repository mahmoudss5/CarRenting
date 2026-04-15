namespace BackEnd.DTOs.Car;

public class CarImageDto
{
    public long ImageId { get; set; }
    public string ImageUrl { get; set; } = null!;
    public bool IsPrimary { get; set; }
    public byte SortOrder { get; set; }
}

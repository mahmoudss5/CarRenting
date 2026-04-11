namespace BackEnd.Models;



public class CarImage
{
    public long Id { get; set; }
    public long CarPostId { get; set; }
    public string ImageUrl { get; set; } = null!;
    public bool IsPrimary { get; set; }
    public byte SortOrder { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public CarPost CarPost { get; set; } = null!;
}

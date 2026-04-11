namespace BackEnd.Models;

public class CarOwner
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public string? BusinessName { get; set; }
    public string? NationalId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? ApprovedByAdminId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User User { get; set; } = null!;
    public User? ApprovedByAdmin { get; set; }
    public ICollection<CarPost> CarPosts { get; set; } = new List<CarPost>();
}

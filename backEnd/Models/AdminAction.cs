namespace BackEnd.Models;

public class AdminAction
{
    public long Id { get; set; }
    public long AdminId { get; set; }
    public string EntityType { get; set; } = null!;
    public long EntityId { get; set; }
    public string Action { get; set; } = null!;
    public string? Reason { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User Admin { get; set; } = null!;
}

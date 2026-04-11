namespace BackEnd.Models;

public class Renter
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User User { get; set; } = null!;
    public DriverLicense? DriverLicense { get; set; }
    public ICollection<RentalRequest> RentalRequests { get; set; } = new List<RentalRequest>();
}

namespace BackEnd.Models;

public class User
{
    public long Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string Role { get; set; } = null!;
    public string AccountStatus { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public CarOwner? CarOwnerProfile { get; set; }
    public Renter? RenterProfile { get; set; }

    public ICollection<CarOwner> ApprovedCarOwners { get; set; } = new List<CarOwner>();
    public ICollection<DriverLicense> VerifiedDriverLicenses { get; set; } = new List<DriverLicense>();
    public ICollection<RentalStatusLog> RentalStatusChanges { get; set; } = new List<RentalStatusLog>();
    public ICollection<Review> ReviewsWritten { get; set; } = new List<Review>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<AdminAction> AdminActions { get; set; } = new List<AdminAction>();
}

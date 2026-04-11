using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<CarOwner> CarOwners => Set<CarOwner>();
    public DbSet<Renter> Renters => Set<Renter>();
    public DbSet<DriverLicense> DriverLicenses => Set<DriverLicense>();
    public DbSet<CarPost> CarPosts => Set<CarPost>();
    public DbSet<CarImage> CarImages => Set<CarImage>();
    public DbSet<AvailabilityCalendar> AvailabilityCalendars => Set<AvailabilityCalendar>();
    public DbSet<RentalRequest> RentalRequests => Set<RentalRequest>();
    public DbSet<RentalStatusLog> RentalStatusLogs => Set<RentalStatusLog>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<AdminAction> AdminActions => Set<AdminAction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("rental");

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.PasswordHash).HasMaxLength(512);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.ProfilePictureUrl).HasMaxLength(500);
            entity.Property(e => e.Role).HasMaxLength(20);
            entity.Property(e => e.AccountStatus).HasMaxLength(20);
        });

        modelBuilder.Entity<CarOwner>(entity =>
        {
            entity.ToTable("CarOwners");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.UserId).IsUnique();
            entity.Property(e => e.BusinessName).HasMaxLength(200);
            entity.Property(e => e.NationalId).HasMaxLength(50);

            entity.HasOne(e => e.User)
                .WithOne(u => u.CarOwnerProfile)
                .HasForeignKey<CarOwner>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.ApprovedByAdmin)
                .WithMany(u => u.ApprovedCarOwners)
                .HasForeignKey(e => e.ApprovedByAdminId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Renter>(entity =>
        {
            entity.ToTable("Renters");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.UserId).IsUnique();

            entity.HasOne(e => e.User)
                .WithOne(u => u.RenterProfile)
                .HasForeignKey<Renter>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<DriverLicense>(entity =>
        {
            entity.ToTable("DriverLicenses");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.RenterId).IsUnique();
            entity.Property(e => e.LicenseNumber).HasMaxLength(100);
            entity.Property(e => e.IssuingCountry).HasMaxLength(100);
            entity.Property(e => e.FrontImageUrl).HasMaxLength(500);
            entity.Property(e => e.BackImageUrl).HasMaxLength(500);
            entity.Property(e => e.VerificationStatus).HasMaxLength(20);

            entity.HasOne(e => e.Renter)
                .WithOne(r => r.DriverLicense)
                .HasForeignKey<DriverLicense>(e => e.RenterId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.VerifiedByAdmin)
                .WithMany(u => u.VerifiedDriverLicenses)
                .HasForeignKey(e => e.VerifiedByAdminId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<CarPost>(entity =>
        {
            entity.ToTable("CarPosts");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.CarType).HasMaxLength(50);
            entity.Property(e => e.Brand).HasMaxLength(100);
            entity.Property(e => e.Model).HasMaxLength(100);
            entity.Property(e => e.Transmission).HasMaxLength(10);
            entity.Property(e => e.Location).HasMaxLength(200);
            entity.Property(e => e.Latitude).HasPrecision(9, 6);
            entity.Property(e => e.Longitude).HasPrecision(9, 6);
            entity.Property(e => e.PricePerDay).HasPrecision(12, 2);
            entity.Property(e => e.PostStatus).HasMaxLength(20);
            entity.Property(e => e.CarStatus).HasMaxLength(20);

            entity.HasOne(e => e.Owner)
                .WithMany(o => o.CarPosts)
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<CarImage>(entity =>
        {
            entity.ToTable("CarImages");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ImageUrl).HasMaxLength(500);

            entity.HasOne(e => e.CarPost)
                .WithMany(p => p.CarImages)
                .HasForeignKey(e => e.CarPostId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<AvailabilityCalendar>(entity =>
        {
            entity.ToTable("AvailabilityCalendars");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.CarPostId, e.CalendarDate }).IsUnique();

            entity.HasOne(e => e.CarPost)
                .WithMany(p => p.AvailabilityCalendars)
                .HasForeignKey(e => e.CarPostId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<RentalRequest>(entity =>
        {
            entity.ToTable("RentalRequests");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.RejectionReason).HasMaxLength(500);
            entity.Property(e => e.TotalPrice).HasPrecision(12, 2);

            entity.HasOne(e => e.Renter)
                .WithMany(r => r.RentalRequests)
                .HasForeignKey(e => e.RenterId)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(e => e.CarPost)
                .WithMany(p => p.RentalRequests)
                .HasForeignKey(e => e.CarPostId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<RentalStatusLog>(entity =>
        {
            entity.ToTable("RentalStatusLogs");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FromStatus).HasMaxLength(20);
            entity.Property(e => e.ToStatus).HasMaxLength(20);
            entity.Property(e => e.Note).HasMaxLength(500);

            entity.HasOne(e => e.RentalRequest)
                .WithMany(r => r.StatusLogs)
                .HasForeignKey(e => e.RentalRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.ChangedByUser)
                .WithMany(u => u.RentalStatusChanges)
                .HasForeignKey(e => e.ChangedByUserId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("Reviews");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.RentalRequestId).IsUnique();
            entity.Property(e => e.Comment).HasMaxLength(1000);

            entity.HasOne(e => e.RentalRequest)
                .WithOne(r => r.Review)
                .HasForeignKey<Review>(e => e.RentalRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Reviewer)
                .WithMany(u => u.ReviewsWritten)
                .HasForeignKey(e => e.ReviewerId)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(e => e.CarPost)
                .WithMany(p => p.Reviews)
                .HasForeignKey(e => e.CarPostId)
                .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.ToTable("Notifications");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Type).HasMaxLength(50);
            entity.Property(e => e.Message).HasMaxLength(500);
            entity.Property(e => e.ReferenceType).HasMaxLength(50);

            entity.HasOne(e => e.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<AdminAction>(entity =>
        {
            entity.ToTable("AdminActions");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.EntityType).HasMaxLength(50);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.Reason).HasMaxLength(500);

            entity.HasOne(e => e.Admin)
                .WithMany(u => u.AdminActions)
                .HasForeignKey(e => e.AdminId)
                .OnDelete(DeleteBehavior.NoAction);
        });
    }
}

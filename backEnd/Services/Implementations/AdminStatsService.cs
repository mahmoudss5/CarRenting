using BackEnd.Common;
using BackEnd.Data;
using BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services.Implementations;

public class AdminStatsService : IAdminStatsService
{
    private readonly AppDbContext _context;

    public AdminStatsService(AppDbContext context) => _context = context;

    public async Task<ResponResult<object>> GetDashboardStatsAsync()
    {
        var totalUsers    = await _context.Users.CountAsync();
        var totalRenters  = await _context.Users.CountAsync(u => u.Role == "Renter");
        var totalOwners   = await _context.Users.CountAsync(u => u.Role == "CarOwner");
        var pendingOwners = await _context.Users.CountAsync(u => u.Role == "CarOwner" && u.AccountStatus == "Pending");

        var totalCars   = await _context.CarPosts.CountAsync();
        var activeCars  = await _context.CarPosts.CountAsync(c => c.PostStatus == "Active");
        var pendingCars = await _context.CarPosts.CountAsync(c => c.PostStatus == "PendingApproval");

        var totalRentals     = await _context.RentalRequests.CountAsync();
        var pendingRentals   = await _context.RentalRequests.CountAsync(r => r.Status == "Pending");
        var activeRentals    = await _context.RentalRequests.CountAsync(r => r.Status == "Accepted");
        var completedRentals = await _context.RentalRequests.CountAsync(r => r.Status == "Completed");

        var totalReviews       = await _context.Reviews.CountAsync();
        var pendingLicenses    = await _context.DriverLicenses.CountAsync(l => l.VerificationStatus == "Pending");

        return ResponResult<object>.Ok(new
        {
            users = new
            {
                total            = totalUsers,
                renters          = totalRenters,
                car_owners       = totalOwners,
                pending_approvals = pendingOwners
            },
            cars = new
            {
                total            = totalCars,
                active           = activeCars,
                pending_approval = pendingCars
            },
            rentals = new
            {
                total     = totalRentals,
                pending   = pendingRentals,
                active    = activeRentals,
                completed = completedRentals
            },
            reviews = new { total = totalReviews },
            licenses = new { pending_verification = pendingLicenses }
        });
    }
}

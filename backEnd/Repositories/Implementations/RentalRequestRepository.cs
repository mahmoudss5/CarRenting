using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class RentalRequestRepository : IRentalRequestRepository
{
    private readonly AppDbContext _context;

    public RentalRequestRepository(AppDbContext context) => _context = context;

    public async Task<RentalRequest?> GetByIdAsync(long id) =>
        await _context.RentalRequests.FindAsync(id);

    public async Task<RentalRequest?> GetByIdWithDetailsAsync(long id) =>
        await _context.RentalRequests
            .Include(r => r.Renter).ThenInclude(r => r.User)
            .Include(r => r.CarPost).ThenInclude(c => c.Owner).ThenInclude(o => o.User)
            .FirstOrDefaultAsync(r => r.Id == id);

    public async Task<IEnumerable<RentalRequest>> GetByRenterIdAsync(long renterId) =>
        await _context.RentalRequests
            .Include(r => r.CarPost)
            .Where(r => r.RenterId == renterId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task<IEnumerable<RentalRequest>> GetByCarOwnerIdAsync(long carOwnerId) =>
        await _context.RentalRequests
            .Include(r => r.Renter).ThenInclude(r => r.User)
            .Include(r => r.CarPost)
            .Where(r => r.CarPost.OwnerId == carOwnerId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task<bool> HasOverlappingAcceptedRentalAsync(long carPostId, DateOnly startDate, DateOnly endDate) =>
        await _context.RentalRequests
            .AnyAsync(r => r.CarPostId == carPostId
                        && r.Status == "Accepted"
                        && r.StartDate <= endDate
                        && r.EndDate >= startDate);

    public async Task<RentalRequest> CreateAsync(RentalRequest request)
    {
        request.CreatedAt = DateTime.UtcNow;
        request.UpdatedAt = DateTime.UtcNow;
        _context.RentalRequests.Add(request);
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task UpdateAsync(RentalRequest request)
    {
        request.UpdatedAt = DateTime.UtcNow;
        _context.RentalRequests.Update(request);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(RentalRequest request)
    {
        _context.RentalRequests.Remove(request);
        await _context.SaveChangesAsync();
    }
}

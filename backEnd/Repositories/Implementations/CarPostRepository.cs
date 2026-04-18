using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class CarPostRepository : ICarPostRepository
{
    private readonly AppDbContext _context;

    public CarPostRepository(AppDbContext context) => _context = context;

    public async Task<CarPost?> GetByIdAsync(long id) =>
        await _context.CarPosts
            .Include(c => c.Owner).ThenInclude(o => o.User)
            .FirstOrDefaultAsync(c => c.Id == id);

    public async Task<CarPost?> GetByIdWithDetailsAsync(long id) =>
        await _context.CarPosts
            .Include(c => c.Owner).ThenInclude(o => o.User)
            .Include(c => c.CarImages)
            .Include(c => c.AvailabilityCalendars)
            .Include(c => c.Reviews).ThenInclude(r => r.Reviewer)
            .FirstOrDefaultAsync(c => c.Id == id);

    public async Task<IEnumerable<CarPost>> GetActiveListingsAsync(int page, int pageSize) =>
        await _context.CarPosts
            .Include(c => c.Owner).ThenInclude(o => o.User)
            .Include(c => c.CarImages)
            .Include(c => c.Reviews)
            .Where(c => c.PostStatus == "Active")
            .OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

    public async Task<int> CountActiveListingsAsync() =>
        await _context.CarPosts.CountAsync(c => c.PostStatus == "Active");

    public async Task<IEnumerable<CarPost>> SearchAsync(string? type, string? brand, string? location,
        decimal? minPrice, decimal? maxPrice, int page, int pageSize)
    {
        var query = _context.CarPosts
            .Include(c => c.Owner).ThenInclude(o => o.User)
            .Include(c => c.CarImages)
            .Include(c => c.Reviews)
            .Where(c => c.PostStatus == "Active");

        if (!string.IsNullOrEmpty(type)) query = query.Where(c => c.CarType == type);
        if (!string.IsNullOrEmpty(brand)) query = query.Where(c => c.Brand.Contains(brand));
        if (!string.IsNullOrEmpty(location)) query = query.Where(c => c.Location.Contains(location));
        if (minPrice.HasValue) query = query.Where(c => c.PricePerDay >= minPrice);
        if (maxPrice.HasValue) query = query.Where(c => c.PricePerDay <= maxPrice);

        return await query
            .OrderByDescending(c => c.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> CountSearchAsync(string? type, string? brand, string? location,
        decimal? minPrice, decimal? maxPrice)
    {
        var query = _context.CarPosts.Where(c => c.PostStatus == "Active");

        if (!string.IsNullOrEmpty(type)) query = query.Where(c => c.CarType == type);
        if (!string.IsNullOrEmpty(brand)) query = query.Where(c => c.Brand.Contains(brand));
        if (!string.IsNullOrEmpty(location)) query = query.Where(c => c.Location.Contains(location));
        if (minPrice.HasValue) query = query.Where(c => c.PricePerDay >= minPrice);
        if (maxPrice.HasValue) query = query.Where(c => c.PricePerDay <= maxPrice);

        return await query.CountAsync();
    }

    public async Task<IEnumerable<CarPost>> GetByOwnerIdAsync(long ownerId) =>
        await _context.CarPosts
            .Where(c => c.OwnerId == ownerId)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

    public async Task<IEnumerable<CarPost>> GetPendingAsync() =>
        await _context.CarPosts
            .Include(c => c.Owner).ThenInclude(o => o.User)
            .Where(c => c.PostStatus == "PendingApproval")
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();

    public async Task<IEnumerable<CarPost>> GetAllForAdminAsync() =>
        await _context.CarPosts
            .Include(c => c.Owner).ThenInclude(o => o.User)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

    public async Task<CarPost> CreateAsync(CarPost carPost)
    {
        carPost.CreatedAt = DateTime.UtcNow;
        carPost.UpdatedAt = DateTime.UtcNow;
        _context.CarPosts.Add(carPost);
        await _context.SaveChangesAsync();
        return carPost;
    }

    public async Task UpdateAsync(CarPost carPost)
    {
        carPost.UpdatedAt = DateTime.UtcNow;
        _context.CarPosts.Update(carPost);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(CarPost carPost)
    {
        _context.CarPosts.Remove(carPost);
        await _context.SaveChangesAsync();
    }
}

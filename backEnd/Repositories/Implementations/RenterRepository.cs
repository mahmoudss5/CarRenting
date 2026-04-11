using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class RenterRepository : IRenterRepository
{
    private readonly AppDbContext _context;

    public RenterRepository(AppDbContext context) => _context = context;

    public async Task<Renter?> GetByIdAsync(long id) =>
        await _context.Renters.Include(r => r.User).FirstOrDefaultAsync(r => r.Id == id);

    public async Task<Renter?> GetByUserIdAsync(long userId) =>
        await _context.Renters.Include(r => r.User).FirstOrDefaultAsync(r => r.UserId == userId);

    public async Task<Renter> CreateAsync(Renter renter)
    {
        renter.CreatedAt = DateTime.UtcNow;
        renter.UpdatedAt = DateTime.UtcNow;
        _context.Renters.Add(renter);
        await _context.SaveChangesAsync();
        return renter;
    }
}

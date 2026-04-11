using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class CarOwnerRepository : ICarOwnerRepository
{
    private readonly AppDbContext _context;

    public CarOwnerRepository(AppDbContext context) => _context = context;

    public async Task<CarOwner?> GetByIdAsync(long id) =>
        await _context.CarOwners.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);

    public async Task<CarOwner?> GetByUserIdAsync(long userId) =>
        await _context.CarOwners.Include(c => c.User).FirstOrDefaultAsync(c => c.UserId == userId);

    public async Task<CarOwner> CreateAsync(CarOwner carOwner)
    {
        carOwner.CreatedAt = DateTime.UtcNow;
        carOwner.UpdatedAt = DateTime.UtcNow;
        _context.CarOwners.Add(carOwner);
        await _context.SaveChangesAsync();
        return carOwner;
    }

    public async Task UpdateAsync(CarOwner carOwner)
    {
        carOwner.UpdatedAt = DateTime.UtcNow;
        _context.CarOwners.Update(carOwner);
        await _context.SaveChangesAsync();
    }
}

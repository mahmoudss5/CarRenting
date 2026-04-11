using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class DriverLicenseRepository : IDriverLicenseRepository
{
    private readonly AppDbContext _context;

    public DriverLicenseRepository(AppDbContext context) => _context = context;

    public async Task<DriverLicense?> GetByIdAsync(long id) =>
        await _context.DriverLicenses
            .Include(d => d.Renter).ThenInclude(r => r.User)
            .FirstOrDefaultAsync(d => d.Id == id);

    public async Task<DriverLicense?> GetByRenterIdAsync(long renterId) =>
        await _context.DriverLicenses
            .Include(d => d.Renter).ThenInclude(r => r.User)
            .FirstOrDefaultAsync(d => d.RenterId == renterId);

    public async Task<IEnumerable<DriverLicense>> GetAllAsync() =>
        await _context.DriverLicenses
            .Include(d => d.Renter).ThenInclude(r => r.User)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();

    public async Task<DriverLicense> CreateAsync(DriverLicense license)
    {
        license.CreatedAt = DateTime.UtcNow;
        license.UpdatedAt = DateTime.UtcNow;
        _context.DriverLicenses.Add(license);
        await _context.SaveChangesAsync();
        return license;
    }

    public async Task UpdateAsync(DriverLicense license)
    {
        license.UpdatedAt = DateTime.UtcNow;
        _context.DriverLicenses.Update(license);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> HasVerifiedLicenseAsync(long renterId) =>
        await _context.DriverLicenses
            .AnyAsync(d => d.RenterId == renterId && d.VerificationStatus == "Verified");
}

using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;

namespace BackEnd.Repositories.Implementations;

public class RentalStatusLogRepository : IRentalStatusLogRepository
{
    private readonly AppDbContext _context;

    public RentalStatusLogRepository(AppDbContext context) => _context = context;

    public async Task CreateAsync(RentalStatusLog log)
    {
        log.CreatedAt = DateTime.UtcNow;
        log.UpdatedAt = DateTime.UtcNow;
        _context.RentalStatusLogs.Add(log);
        await _context.SaveChangesAsync();
    }
}

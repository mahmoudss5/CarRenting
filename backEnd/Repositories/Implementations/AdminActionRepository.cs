using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;

namespace BackEnd.Repositories.Implementations;

public class AdminActionRepository : IAdminActionRepository
{
    private readonly AppDbContext _context;

    public AdminActionRepository(AppDbContext context) => _context = context;

    public async Task CreateAsync(AdminAction action)
    {
        action.CreatedAt = DateTime.UtcNow;
        action.UpdatedAt = DateTime.UtcNow;
        _context.AdminActions.Add(action);
        await _context.SaveChangesAsync();
    }
}

using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class CarImageRepository : ICarImageRepository
{
    private readonly AppDbContext _context;

    public CarImageRepository(AppDbContext context) => _context = context;

    public async Task<CarImage?> GetByIdAsync(long id) =>
        await _context.CarImages.FindAsync(id);

    public async Task<IEnumerable<CarImage>> GetByCarPostIdAsync(long carPostId) =>
        await _context.CarImages
            .Where(i => i.CarPostId == carPostId)
            .OrderBy(i => i.SortOrder)
            .ToListAsync();

    public async Task<CarImage> CreateAsync(CarImage image)
    {
        image.CreatedAt = DateTime.UtcNow;
        image.UpdatedAt = DateTime.UtcNow;
        _context.CarImages.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task DeleteAsync(CarImage image)
    {
        _context.CarImages.Remove(image);
        await _context.SaveChangesAsync();
    }
}

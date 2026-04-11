using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class AvailabilityCalendarRepository : IAvailabilityCalendarRepository
{
    private readonly AppDbContext _context;

    public AvailabilityCalendarRepository(AppDbContext context) => _context = context;

    public async Task<IEnumerable<AvailabilityCalendar>> GetByCarPostIdAsync(long carPostId) =>
        await _context.AvailabilityCalendars
            .Where(a => a.CarPostId == carPostId)
            .OrderBy(a => a.CalendarDate)
            .ToListAsync();

    public async Task<AvailabilityCalendar?> GetByCarPostAndDateAsync(long carPostId, DateOnly date) =>
        await _context.AvailabilityCalendars
            .FirstOrDefaultAsync(a => a.CarPostId == carPostId && a.CalendarDate == date);

    public async Task UpsertRangeAsync(long carPostId, IEnumerable<AvailabilityCalendar> entries)
    {
        var now = DateTime.UtcNow;
        foreach (var entry in entries)
        {
            var existing = await _context.AvailabilityCalendars
                .FirstOrDefaultAsync(a => a.CarPostId == carPostId && a.CalendarDate == entry.CalendarDate);

            if (existing is null)
            {
                entry.CarPostId = carPostId;
                entry.CreatedAt = now;
                entry.UpdatedAt = now;
                _context.AvailabilityCalendars.Add(entry);
            }
            else
            {
                existing.IsAvailable = entry.IsAvailable;
                existing.UpdatedAt = now;
            }
        }
        await _context.SaveChangesAsync();
    }
}

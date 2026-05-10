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

    public async Task<bool> HasBlockedDatesAsync(long carPostId, DateOnly startDate, DateOnly endDate) =>
        await _context.AvailabilityCalendars
            .AnyAsync(a => a.CarPostId == carPostId
                        && a.CalendarDate >= startDate
                        && a.CalendarDate <= endDate
                        && !a.IsAvailable);

    // Returns true if ANY calendar entry in the range is explicitly marked unavailable.
    // Dates not present in the calendar are considered available (owner hasn't blocked them).
    public async Task<bool> HasUnavailableDateInRangeAsync(long carPostId, DateOnly startDate, DateOnly endDate) =>
        await HasBlockedDatesAsync(carPostId, startDate, endDate);

    // Marks every date in [startDate, endDate] as unavailable (upsert).
    public async Task BlockDatesRangeAsync(long carPostId, DateOnly startDate, DateOnly endDate)
    {
        var now = DateTime.UtcNow;
        var current = startDate;
        while (current <= endDate)
        {
            var existing = await _context.AvailabilityCalendars
                .FirstOrDefaultAsync(a => a.CarPostId == carPostId && a.CalendarDate == current);

            if (existing is null)
            {
                _context.AvailabilityCalendars.Add(new AvailabilityCalendar
                {
                    CarPostId = carPostId,
                    CalendarDate = current,
                    IsAvailable = false,
                    CreatedAt = now,
                    UpdatedAt = now
                });
            }
            else
            {
                existing.IsAvailable = false;
                existing.UpdatedAt = now;
            }

            current = current.AddDays(1);
        }

        await _context.SaveChangesAsync();
    }

    public async Task UnblockDatesRangeIfNoAcceptedRentalsAsync(long carPostId, DateOnly startDate, DateOnly endDate, long excludeRentalRequestId)
    {
        var now = DateTime.UtcNow;
        var current = startDate;

        while (current <= endDate)
        {
            var dateHasOtherAcceptedRental = await _context.RentalRequests
                .AnyAsync(r => r.CarPostId == carPostId
                            && r.Id != excludeRentalRequestId
                            && r.Status == "Accepted"
                            && r.StartDate <= current
                            && r.EndDate >= current);

            if (!dateHasOtherAcceptedRental)
            {
                var existing = await _context.AvailabilityCalendars
                    .FirstOrDefaultAsync(a => a.CarPostId == carPostId && a.CalendarDate == current);

                if (existing is not null)
                {
                    existing.IsAvailable = true;
                    existing.UpdatedAt = now;
                }
            }

            current = current.AddDays(1);
        }

        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<DateOnly>> GetUnavailableDatesForNextMonthsAsync(long carPostId, int months)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var rangeEnd = today.AddMonths(months);

        var blockedDates = await _context.AvailabilityCalendars
            .Where(a => a.CarPostId == carPostId
                        && a.CalendarDate >= today
                        && a.CalendarDate <= rangeEnd
                        && !a.IsAvailable)
            .Select(a => a.CalendarDate)
            .ToListAsync();

        var rentalRanges = await _context.RentalRequests
            .Where(r => r.CarPostId == carPostId
                        && r.Status == "Accepted"
                        && r.EndDate >= today
                        && r.StartDate <= rangeEnd)
            .Select(r => new { r.StartDate, r.EndDate })
            .ToListAsync();

        var bookedDates = new HashSet<DateOnly>();
        foreach (var r in rentalRanges)
        {
            var start = r.StartDate < today ? today : r.StartDate;
            var end = r.EndDate > rangeEnd ? rangeEnd : r.EndDate;
            for (var d = start; d <= end; d = d.AddDays(1))
                bookedDates.Add(d);
        }

        return blockedDates.Union(bookedDates).Distinct().OrderBy(d => d);
    }
}

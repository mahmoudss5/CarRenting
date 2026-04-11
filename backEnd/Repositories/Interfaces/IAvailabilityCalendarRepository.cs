using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IAvailabilityCalendarRepository
{
    Task<IEnumerable<AvailabilityCalendar>> GetByCarPostIdAsync(long carPostId);
    Task<AvailabilityCalendar?> GetByCarPostAndDateAsync(long carPostId, DateOnly date);
    Task UpsertRangeAsync(long carPostId, IEnumerable<AvailabilityCalendar> entries);
    Task<bool> HasUnavailableDateInRangeAsync(long carPostId, DateOnly startDate, DateOnly endDate);
    Task BlockDatesRangeAsync(long carPostId, DateOnly startDate, DateOnly endDate);
}

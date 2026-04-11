using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface INotificationRepository
{
    Task<IEnumerable<Notification>> GetByUserIdAsync(long userId);
    Task<Notification?> GetByIdAsync(long id);
    Task<int> CountUnreadAsync(long userId);
    Task CreateAsync(Notification notification);
    Task UpdateAsync(Notification notification);
    Task MarkAllReadAsync(long userId);
    Task DeleteAsync(Notification notification);
    Task<int> CountAsync(long userId);
}

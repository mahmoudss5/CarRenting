using BackEnd.Common;
using BackEnd.DTOs.Notification;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class NotificationService : INotificationService
{
    private readonly INotificationRepository _repo;
    private readonly INotificationHubService _hub;

    public NotificationService(INotificationRepository repo, INotificationHubService hub)
    {
        _repo = repo;
        _hub = hub;
    }

    public async Task<ResponResult<NotificationsListDto>> GetMyNotificationsAsync(long userId)
    {
        var notifications = await _repo.GetByUserIdAsync(userId);
        var items = notifications.Select(n => new NotificationDto
        {
            NotificationId = n.Id,
            Type = n.Type,
            Message = n.Message,
            IsRead = n.IsRead,
            CreatedAt = n.CreatedAt
        }).ToList();

        return ResponResult<NotificationsListDto>.Ok(new NotificationsListDto
        {
            Notifications = items,
            UnreadCount = items.Count(n => !n.IsRead),
            Total = items.Count
        });
    }

    public async Task<ResponResult<object>> GetUnreadCountAsync(long userId)
    {
        var count = await _repo.CountUnreadAsync(userId);
        return ResponResult<object>.Ok(new { unread_count = count });
    }

    public async Task<ResponResult<object>> MarkReadAsync(long notificationId, long userId)
    {
        var notification = await _repo.GetByIdAsync(notificationId);
        if (notification is null) return ResponResult<object>.NotFound("Notification not found.");
        if (notification.UserId != userId) return ResponResult<object>.Forbidden("Access denied.");

        notification.IsRead = true;
        await _repo.UpdateAsync(notification);

        return ResponResult<object>.Ok(new { message = "Notification marked as read.", notification_id = notificationId, is_read = true });
    }

    public async Task<ResponResult<object>> MarkAllReadAsync(long userId)
    {
        var before = await _repo.CountUnreadAsync(userId);
        await _repo.MarkAllReadAsync(userId);
        return ResponResult<object>.Ok(new { message = "All notifications marked as read.", updated_count = before });
    }

    public async Task<ResponResult<object>> DeleteAsync(long notificationId, long userId)
    {
        var notification = await _repo.GetByIdAsync(notificationId);
        if (notification is null) return ResponResult<object>.NotFound("Notification not found.");
        if (notification.UserId != userId) return ResponResult<object>.Forbidden("Access denied.");

        await _repo.DeleteAsync(notification);
        return ResponResult<object>.Ok(new { message = "Notification deleted successfully.", notification_id = notificationId });
    }

    public async Task CreateAsync(long userId, string type, string message, long? referenceId = null, string? referenceType = null)
    {
        var notification = new Notification
        {
            UserId = userId,
            Type = type,
            Message = message,
            ReferenceId = referenceId,
            ReferenceType = referenceType,
            IsRead = false
        };

        await _repo.CreateAsync(notification);

        await _hub.SendNotificationAsync(userId, new NotificationDto
        {
            NotificationId = notification.Id,
            Type = notification.Type,
            Message = notification.Message,
            IsRead = false,
            CreatedAt = notification.CreatedAt
        });
    }
}

using BackEnd.Common;
using BackEnd.DTOs.Notification;

namespace BackEnd.Services.Interfaces;

public interface INotificationService
{
    Task<ResponResult<NotificationsListDto>> GetMyNotificationsAsync(long userId);
    Task<ResponResult<object>> GetUnreadCountAsync(long userId);
    Task<ResponResult<object>> MarkReadAsync(long notificationId, long userId);
    Task<ResponResult<object>> MarkAllReadAsync(long userId);
    Task<ResponResult<object>> DeleteAsync(long notificationId, long userId);
    Task CreateAsync(long userId, string type, string message, long? referenceId = null, string? referenceType = null);
}

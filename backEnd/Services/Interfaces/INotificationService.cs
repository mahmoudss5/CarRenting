using BackEnd.Common;
using BackEnd.DTOs.Notification;

namespace BackEnd.Services.Interfaces;

public interface INotificationService
{
    Task<ServiceResult<NotificationsListDto>> GetMyNotificationsAsync(long userId);
    Task<ServiceResult<object>> MarkReadAsync(long notificationId, long userId);
    Task<ServiceResult<object>> MarkAllReadAsync(long userId);
    Task<ServiceResult<object>> DeleteAsync(long notificationId, long userId);
    Task CreateAsync(long userId, string type, string message, long? referenceId = null, string? referenceType = null);
}

using BackEnd.DTOs.Notification;

namespace BackEnd.Services.Interfaces;

public interface INotificationHubService
{
    Task SendNotificationAsync(long userId, NotificationDto notification);
}

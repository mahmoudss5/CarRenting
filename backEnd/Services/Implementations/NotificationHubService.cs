using BackEnd.DTOs.Notification;
using BackEnd.Hubs;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace BackEnd.Services.Implementations;

public class NotificationHubService : INotificationHubService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationHubService(IHubContext<NotificationHub> hubContext) =>
        _hubContext = hubContext;

    public Task SendNotificationAsync(long userId, NotificationDto notification) =>
        _hubContext.Clients
            .Group($"user_{userId}")
            .SendAsync("ReceiveNotification", notification);
}

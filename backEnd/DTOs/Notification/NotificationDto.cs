namespace BackEnd.DTOs.Notification;

public class NotificationDto
{
    public long NotificationId { get; set; }
    public string Type { get; set; } = null!;
    public string Message { get; set; } = null!;
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class NotificationsListDto
{
    public List<NotificationDto> Notifications { get; set; } = new();
    public int UnreadCount { get; set; }
    public int Total { get; set; }
}

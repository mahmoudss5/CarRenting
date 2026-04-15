using BackEnd.DTOs.Notification;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/notifications")]
[Authorize]
public class NotificationsController : ApiController
{
    private readonly INotificationService _notificationService;

    public NotificationsController(INotificationService notificationService) =>
        _notificationService = notificationService;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        FromResult(await _notificationService.GetMyNotificationsAsync(CurrentUserId));

    [HttpPatch("{id:long}/read")]
    public async Task<IActionResult> MarkRead(long id) =>
        FromResult(await _notificationService.MarkReadAsync(id, CurrentUserId));

    [HttpPatch("read-all")]
    public async Task<IActionResult> MarkAllRead() =>
        FromResult(await _notificationService.MarkAllReadAsync(CurrentUserId));

    [HttpGet("unread-count")]
    public async Task<IActionResult> UnreadCount() =>
        FromResult(await _notificationService.GetUnreadCountAsync(CurrentUserId));

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id) =>
        FromResult(await _notificationService.DeleteAsync(id, CurrentUserId));
}

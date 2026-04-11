using BackEnd.Common;
using BackEnd.DTOs.User;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class UserAdminService : IUserAdminService
{
    private readonly IUserRepository _users;
    private readonly IAdminActionRepository _adminActions;
    private readonly INotificationService _notifications;

    public UserAdminService(IUserRepository users, IAdminActionRepository adminActions,
        INotificationService notifications)
    {
        _users = users;
        _adminActions = adminActions;
        _notifications = notifications;
    }

    public async Task<ResponResult<IEnumerable<UserSummaryDto>>> GetAllUsersAsync()
    {
        var users = await _users.GetAllAsync();
        var result = users.Select(u => new UserSummaryDto
        {
            UserId = u.Id,
            FullName = $"{u.FirstName} {u.LastName}".Trim(),
            Email = u.Email,
            Role = u.Role,
            Status = u.AccountStatus,
            CreatedAt = u.CreatedAt
        });
        return ResponResult<IEnumerable<UserSummaryDto>>.Ok(result);
    }

    public async Task<ResponResult<UserDetailDto>> GetUserByIdAsync(long id)
    {
        var user = await _users.GetByIdAsync(id);
        if (user is null) return ResponResult<UserDetailDto>.NotFound("User not found.");

        return ResponResult<UserDetailDto>.Ok(new UserDetailDto
        {
            UserId = user.Id,
            FullName = $"{user.FirstName} {user.LastName}".Trim(),
            Email = user.Email,
            Role = user.Role,
            Status = user.AccountStatus,
            PhoneNumber = user.PhoneNumber,
            IsApproved = user.AccountStatus == "Active",
            CreatedAt = user.CreatedAt
        });
    }

    public async Task<ResponResult<UserActionResponseDto>> ApproveUserAsync(long id, long adminId)
    {
        var user = await _users.GetByIdAsync(id);
        if (user is null) return ResponResult<UserActionResponseDto>.NotFound("User not found.");

        user.AccountStatus = "Active";
        await _users.UpdateAsync(user);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "User",
            EntityId = id,
            Action = "Approve"
        });

        await _notifications.CreateAsync(user.Id, "AccountApproved",
            $"Your {user.Role} account has been approved.",
            referenceId: user.Id, referenceType: "User");

        return ResponResult<UserActionResponseDto>.Ok(new UserActionResponseDto
        {
            Message = $"{user.Role} account approved successfully.",
            UserId = user.Id,
            Status = user.AccountStatus
        });
    }

    public async Task<ResponResult<UserActionResponseDto>> RejectUserAsync(long id, string reason, long adminId)
    {
        var user = await _users.GetByIdAsync(id);
        if (user is null) return ResponResult<UserActionResponseDto>.NotFound("User not found.");

        user.AccountStatus = "Rejected";
        await _users.UpdateAsync(user);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "User",
            EntityId = id,
            Action = "Reject",
            Reason = reason
        });

        await _notifications.CreateAsync(user.Id, "AccountRejected",
            $"Your account registration was rejected. Reason: {reason}",
            referenceId: user.Id, referenceType: "User");

        return ResponResult<UserActionResponseDto>.Ok(new UserActionResponseDto
        {
            Message = $"{user.Role} account rejected.",
            UserId = user.Id,
            Status = user.AccountStatus
        });
    }

    public async Task<ResponResult<object>> DeleteUserAsync(long id)
    {
        var user = await _users.GetByIdAsync(id);
        if (user is null) return ResponResult<object>.NotFound("User not found.");

        await _users.DeleteAsync(user);
        return ResponResult<object>.Ok(new { message = "User deleted successfully.", user_id = id });
    }

    public async Task<ResponResult<object>> promoteToAdminAsync(long id)
    {
        var user = await _users.GetByIdAsync(id);
        if(user is null) return ResponResult<object>.NotFound("User not found.");
        user.Role = "Admin";
        await _users.UpdateAsync(user);
        return ResponResult<object>.Ok(new { message = "User promoted to admin successfully.", user_id = id });
    }
}

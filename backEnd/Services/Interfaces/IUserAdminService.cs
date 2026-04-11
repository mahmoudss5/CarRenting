using BackEnd.Common;
using BackEnd.DTOs.User;

namespace BackEnd.Services.Interfaces;

public interface IUserAdminService
{
    Task<ResponResult<IEnumerable<UserSummaryDto>>> GetAllUsersAsync();
    Task<ResponResult<UserDetailDto>> GetUserByIdAsync(long id);
    Task<ResponResult<UserActionResponseDto>> ApproveUserAsync(long id, long adminId);
    Task<ResponResult<UserActionResponseDto>> RejectUserAsync(long id, string reason, long adminId);
    Task<ResponResult<object>> DeleteUserAsync(long id);
    Task<ResponResult<object>> promoteToAdminAsync(long id);
}

using BackEnd.Common;
using BackEnd.DTOs.User;

namespace BackEnd.Services.Interfaces;

public interface IUserAdminService
{
    Task<ServiceResult<IEnumerable<UserSummaryDto>>> GetAllUsersAsync();
    Task<ServiceResult<UserDetailDto>> GetUserByIdAsync(long id);
    Task<ServiceResult<UserActionResponseDto>> ApproveUserAsync(long id, long adminId);
    Task<ServiceResult<UserActionResponseDto>> RejectUserAsync(long id, string reason, long adminId);
    Task<ServiceResult<object>> DeleteUserAsync(long id);
}

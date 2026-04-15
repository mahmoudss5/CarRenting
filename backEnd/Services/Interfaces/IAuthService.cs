using BackEnd.Common;
using BackEnd.DTOs.Auth;

namespace BackEnd.Services.Interfaces;

public interface IAuthService
{
    Task<ResponResult<RegisterResponseDto>> RegisterAsync(RegisterRequestDto dto);
    Task<ResponResult<LoginResponseDto>> LoginAsync(LoginRequestDto dto);
    Task<ResponResult<MeResponseDto>> GetMeAsync(long userId);
    Task<ResponResult<MeResponseDto>> UpdateProfileAsync(long userId, UpdateProfileRequestDto dto);
    Task<ResponResult<object>> ChangePasswordAsync(long userId, ChangePasswordRequestDto dto);
}

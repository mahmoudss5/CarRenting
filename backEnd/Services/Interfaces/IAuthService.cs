using BackEnd.Common;
using BackEnd.DTOs.Auth;

namespace BackEnd.Services.Interfaces;

public interface IAuthService
{
    Task<ServiceResult<RegisterResponseDto>> RegisterAsync(RegisterRequestDto dto);
    Task<ServiceResult<LoginResponseDto>> LoginAsync(LoginRequestDto dto);
    Task<ServiceResult<MeResponseDto>> GetMeAsync(long userId);
}

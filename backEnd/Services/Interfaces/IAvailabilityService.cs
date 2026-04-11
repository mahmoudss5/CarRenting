using BackEnd.Common;
using BackEnd.DTOs.Availability;

namespace BackEnd.Services.Interfaces;

public interface IAvailabilityService
{
    Task<ResponResult<CarAvailabilityResponseDto>> GetAvailabilityAsync(long carPostId);
    Task<ResponResult<object>> SetAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId);
    Task<ResponResult<object>> UpdateAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId);
}

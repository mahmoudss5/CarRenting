using BackEnd.Common;
using BackEnd.DTOs.Availability;

namespace BackEnd.Services.Interfaces;

public interface IAvailabilityService
{
    Task<ServiceResult<CarAvailabilityResponseDto>> GetAvailabilityAsync(long carPostId);
    Task<ServiceResult<object>> SetAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId);
    Task<ServiceResult<object>> UpdateAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId);
}

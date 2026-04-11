using BackEnd.Common;
using BackEnd.DTOs.Car;

namespace BackEnd.Services.Interfaces;

public interface ICarPostService
{
    Task<ServiceResult<object>> GetActiveListingsAsync(int page, int pageSize);
    Task<ServiceResult<CarDetailDto>> GetByIdAsync(long id);
    Task<ServiceResult<object>> SearchAsync(CarSearchQueryDto query);
    Task<ServiceResult<CarPostCreatedDto>> CreateAsync(CreateCarPostRequestDto dto, long userId);
    Task<ServiceResult<CarPostUpdatedDto>> UpdateAsync(long id, UpdateCarPostRequestDto dto, long userId);
    Task<ServiceResult<object>> DeleteAsync(long id, long userId, string userRole);
    Task<ServiceResult<IEnumerable<OwnerCarDto>>> GetOwnerCarsAsync(long userId);
    Task<ServiceResult<object>> GetPendingCarsAsync();
    Task<ServiceResult<AdminCarActionResponseDto>> ApproveCarAsync(long id, long adminId);
    Task<ServiceResult<AdminCarActionResponseDto>> RejectCarAsync(long id, string reason, long adminId);
}

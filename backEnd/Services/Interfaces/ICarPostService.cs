using BackEnd.Common;
using BackEnd.DTOs.Car;

namespace BackEnd.Services.Interfaces;

public interface ICarPostService
{
    Task<ResponResult<object>> GetActiveListingsAsync(int page, int pageSize);
    Task<ResponResult<CarDetailDto>> GetByIdAsync(long id);
    Task<ResponResult<object>> SearchAsync(CarSearchQueryDto query);
    Task<ResponResult<CarPostCreatedDto>> CreateAsync(CreateCarPostRequestDto dto, long userId);
    Task<ResponResult<CarPostUpdatedDto>> UpdateAsync(long id, UpdateCarPostRequestDto dto, long userId);
    Task<ResponResult<object>> DeleteAsync(long id, long userId, string userRole);
    Task<ResponResult<IEnumerable<OwnerCarDto>>> GetOwnerCarsAsync(long userId);
    Task<ResponResult<object>> GetPendingCarsAsync();
    Task<ResponResult<AdminCarActionResponseDto>> ApproveCarAsync(long id, long adminId);
    Task<ResponResult<AdminCarActionResponseDto>> RejectCarAsync(long id, string reason, long adminId);
    Task<ResponResult<CarImageDto>> AddCarImageAsync(long carPostId, IFormFile image, bool isPrimary, long userId);
    Task<ResponResult<object>> DeleteCarImageAsync(long carPostId, long imageId, long userId);
}

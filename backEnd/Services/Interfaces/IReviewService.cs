using BackEnd.Common;
using BackEnd.DTOs.Review;

namespace BackEnd.Services.Interfaces;

public interface IReviewService
{
    Task<ServiceResult<ReviewCreatedResponseDto>> CreateAsync(CreateReviewRequestDto dto, long userId);
    Task<ServiceResult<CarReviewsResponseDto>> GetByCarIdAsync(long carPostId);
    Task<ServiceResult<IEnumerable<RenterReviewItemDto>>> GetMyReviewsAsync(long userId);
    Task<ServiceResult<object>> DeleteAsync(long id);
}

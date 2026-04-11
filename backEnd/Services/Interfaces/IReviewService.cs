using BackEnd.Common;
using BackEnd.DTOs.Review;

namespace BackEnd.Services.Interfaces;

public interface IReviewService
{
    Task<ResponResult<ReviewCreatedResponseDto>> CreateAsync(CreateReviewRequestDto dto, long userId);
    Task<ResponResult<CarReviewsResponseDto>> GetByCarIdAsync(long carPostId);
    Task<ResponResult<IEnumerable<RenterReviewItemDto>>> GetMyReviewsAsync(long userId);
    Task<ResponResult<object>> DeleteAsync(long id);
}

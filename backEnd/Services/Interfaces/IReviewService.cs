using BackEnd.Common;
using BackEnd.DTOs.Car;
using BackEnd.DTOs.Review;

namespace BackEnd.Services.Interfaces;

public interface IReviewService
{
    Task<ResponResult<ReviewCreatedResponseDto>> CreateAsync(CreateReviewRequestDto dto, long userId);
    Task<ResponResult<CarReviewsResponseDto>> GetByCarIdAsync(long carPostId);
    Task<ResponResult<IEnumerable<RenterReviewItemDto>>> GetMyReviewsAsync(long userId);
    Task<ResponResult<object>> DeleteAsync(long id);
    Task<ResponResult<List<CarReviewItemDto>>> GetTopCarReviewsAsync(long carPostId,int count);
    Task<ResponResult<List<RenterReviewItemDto>>> GetAllCarPostReviews(long carPostId);
    Task<ResponResult<List<RenterReviewItemDto>>> GetAllReviews();
}

using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IReviewRepository
{
    Task<Review?> GetByIdAsync(long id);
    Task<IEnumerable<Review>> GetByCarPostIdAsync(long carPostId);
    Task<IEnumerable<Review>> GetByReviewerIdAsync(long reviewerId);
    Task<bool> ExistsForRentalAsync(long rentalRequestId);
    Task<Review> CreateAsync(Review review);
    Task DeleteAsync(Review review);
    Task<double> GetAverageRatingAsync(long carPostId);
    Task<Dictionary<long, double>> GetAverageRatingsByCarPostIdsAsync(IEnumerable<long> carPostIds);
    Task<List<Review>> GetTopReviewsAsync(long carPostId, int count);
    Task<List<Review>> GetAllReviewsAsync(long carPostId);
    Task<List<Review>> GetAllReviews();
}

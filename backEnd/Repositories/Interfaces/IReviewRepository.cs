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
}

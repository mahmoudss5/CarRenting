using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories.Implementations;

public class ReviewRepository : IReviewRepository
{
    private readonly AppDbContext _context;

    public ReviewRepository(AppDbContext context) => _context = context;

    public async Task<Review?> GetByIdAsync(long id) =>
        await _context.Reviews.Include(r => r.Reviewer).FirstOrDefaultAsync(r => r.Id == id);

    public async Task<IEnumerable<Review>> GetByCarPostIdAsync(long carPostId) =>
        await _context.Reviews
            .Include(r => r.Reviewer)
            .Where(r => r.CarPostId == carPostId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task<IEnumerable<Review>> GetByReviewerIdAsync(long reviewerId) =>
        await _context.Reviews
            .Include(r => r.CarPost)
            .Where(r => r.ReviewerId == reviewerId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task<bool> ExistsForRentalAsync(long rentalRequestId) =>
        await _context.Reviews.AnyAsync(r => r.RentalRequestId == rentalRequestId);

    public async Task<Review> CreateAsync(Review review)
    {
        review.CreatedAt = DateTime.UtcNow;
        review.UpdatedAt = DateTime.UtcNow;
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
        return review;
    }

    public async Task DeleteAsync(Review review)
    {
        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();
    }

    public async Task<double> GetAverageRatingAsync(long carPostId)
    {
        var ratings = await _context.Reviews
            .Where(r => r.CarPostId == carPostId)
            .Select(r => (double)r.Rating)
            .ToListAsync();

        return ratings.Count > 0 ? ratings.Average() : 0;
    }

    public async Task<List<Review>> GetTopReviewsAsync(long carPostId, int count)
    {
        // here we get the first count reviews with the highest rating
        return await _context.Reviews
            .Where(r => r.CarPostId == carPostId)
            .OrderByDescending(r => r.Rating)
            .Take(count)
            .ToListAsync();
    }

    public async Task<List<Review>> GetAllReviewsAsync(long carPostId)
    {
        //fetching all reviews in dataBase for a specific car
        
        var res= await _context.Reviews.Where(r => r.CarPostId == carPostId).ToListAsync();
        return res;
    }

    public async Task<List<Review>> GetAllReviews()
    {
        var res= await _context.Reviews.ToListAsync();
        return res;
    }
}

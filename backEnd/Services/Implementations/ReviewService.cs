using BackEnd.Common;
using BackEnd.DTOs.Review;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviews;
    private readonly IRentalRequestRepository _rentals;
    private readonly IRenterRepository _renters;
    private readonly ICarPostRepository _carPosts;
    private readonly INotificationService _notifications;

    public ReviewService(IReviewRepository reviews, IRentalRequestRepository rentals,
        IRenterRepository renters, ICarPostRepository carPosts, INotificationService notifications)
    {
        _reviews = reviews;
        _rentals = rentals;
        _renters = renters;
        _carPosts = carPosts;
        _notifications = notifications;
    }

    public async Task<ResponResult<ReviewCreatedResponseDto>> CreateAsync(CreateReviewRequestDto dto, long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null) return ResponResult<ReviewCreatedResponseDto>.Forbidden("Only Renters can submit reviews.");

        var rental = await _rentals.GetByIdWithDetailsAsync(dto.RequestId);
        if (rental is null) return ResponResult<ReviewCreatedResponseDto>.NotFound("Rental request not found.");

        if (rental.RenterId != renter.Id)
            return ResponResult<ReviewCreatedResponseDto>.Forbidden("You can only review your own rentals.");

        if (rental.Status != "Completed")
            return ResponResult<ReviewCreatedResponseDto>.Forbidden("You can only review after the rental is completed.");

        if (await _reviews.ExistsForRentalAsync(dto.RequestId))
            return ResponResult<ReviewCreatedResponseDto>.Fail("A review already exists for this rental.");

        var review = new Review
        {
            RentalRequestId = dto.RequestId,
            ReviewerId = userId,
            CarPostId = dto.PostId,
            Rating = dto.Rating,
            Comment = dto.Feedback
        };

        review = await _reviews.CreateAsync(review);

        await _notifications.CreateAsync(rental.CarPost.Owner.UserId, "NewReview",
            $"A new review was posted for your car {rental.CarPost.Title}.",
            referenceId: review.Id, referenceType: "Review");

        return ResponResult<ReviewCreatedResponseDto>.Created(new ReviewCreatedResponseDto
        {
            Message = "Review submitted successfully.",
            Review = new ReviewDataDto
            {
                ReviewId = review.Id,
                PostId = review.CarPostId,
                RenterName = $"{renter.User.FirstName} {renter.User.LastName}".Trim(),
                Rating = review.Rating,
                Feedback = review.Comment,
                CreatedAt = review.CreatedAt
            }
        });
    }

    public async Task<ResponResult<CarReviewsResponseDto>> GetByCarIdAsync(long carPostId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ResponResult<CarReviewsResponseDto>.NotFound("Car post not found.");

        var reviews = await _reviews.GetByCarPostIdAsync(carPostId);
        var items = reviews.Select(r => new ReviewItemDto
        {
            ReviewId = r.Id,
            RenterName = $"{r.Reviewer.FirstName} {r.Reviewer.LastName}".Trim(),
            Rating = r.Rating,
            Feedback = r.Comment,
            CreatedAt = r.CreatedAt
        }).ToList();

        var avg = items.Count > 0 ? items.Average(r => (double)r.Rating) : 0;

        return ResponResult<CarReviewsResponseDto>.Ok(new CarReviewsResponseDto
        {
            PostId = carPostId,
            AverageRating = Math.Round(avg, 1),
            Reviews = items,
            Total = items.Count
        });
    }

    public async Task<ResponResult<IEnumerable<RenterReviewItemDto>>> GetMyReviewsAsync(long userId)
    {
        var reviews = await _reviews.GetByReviewerIdAsync(userId);
        var items = reviews.Select(r => new RenterReviewItemDto
        {
            ReviewId = r.Id,
            CarTitle = r.CarPost.Title,
            Rating = r.Rating,
            Feedback = r.Comment,
            CreatedAt = r.CreatedAt
        });
        return ResponResult<IEnumerable<RenterReviewItemDto>>.Ok(items);
    }

    public async Task<ResponResult<object>> DeleteAsync(long id)
    {
        var review = await _reviews.GetByIdAsync(id);
        if (review is null) return ResponResult<object>.NotFound("Review not found.");

        await _reviews.DeleteAsync(review);
        return ResponResult<object>.Ok(new { message = "Review deleted successfully.", review_id = id });
    }
}

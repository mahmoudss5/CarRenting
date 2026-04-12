using BackEnd.DTOs.Review;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/reviews")]
public class ReviewsController : ApiController
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService) => _reviewService = reviewService;

    // POST /api/reviews
    [HttpPost]
    [Authorize(Roles = "Renter")]
    public async Task<IActionResult> Create([FromBody] CreateReviewRequestDto dto) =>
        FromResult(await _reviewService.CreateAsync(dto, CurrentUserId));

    // DELETE /api/reviews/{id}
    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(long id) =>
        FromResult(await _reviewService.DeleteAsync(id));

    // GET /api/reviews/my
    [HttpGet("my")]
    [Authorize(Roles = "Renter")]
    public async Task<IActionResult> GetMyReviews() =>
        FromResult(await _reviewService.GetMyReviewsAsync(CurrentUserId));

    // GET /api/reviews/all
    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllReviews() =>
        FromResult(await _reviewService.GetAllReviews());

    // GET /api/reviews/car/{carPostId}
    [HttpGet("car/{carPostId:long}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByCarId(long carPostId) =>
        FromResult(await _reviewService.GetByCarIdAsync(carPostId));

    // GET /api/reviews/car/{carPostId}/all
    [HttpGet("car/{carPostId:long}/all")]
    [Authorize(Roles = "Renter,CarOwner,Admin")]
    public async Task<IActionResult> GetAllCarPostReviews(long carPostId) =>
        FromResult(await _reviewService.GetAllCarPostReviews(carPostId));

    // GET /api/reviews/car/{carPostId}/top?count=5
    [HttpGet("car/{carPostId:long}/top")]
    [AllowAnonymous]
    public async Task<IActionResult> GetTopCarReviews(long carPostId, [FromQuery] int count = 5) =>
        FromResult(await _reviewService.GetTopCarReviewsAsync(carPostId, count));
}

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

    [HttpPost]
    [Authorize(Roles = "Renter")]
    public async Task<IActionResult> Create([FromBody] CreateReviewRequestDto dto) =>
        FromResult(await _reviewService.CreateAsync(dto, CurrentUserId));

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(long id) =>
        FromResult(await _reviewService.DeleteAsync(id));
}

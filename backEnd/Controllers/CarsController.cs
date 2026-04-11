using BackEnd.DTOs.Availability;
using BackEnd.DTOs.Car;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/cars")]
public class CarsController : ApiController
{
    private readonly ICarPostService _carService;
    private readonly IAvailabilityService _availabilityService;
    private readonly IReviewService _reviewService;

    public CarsController(ICarPostService carService, IAvailabilityService availabilityService,
        IReviewService reviewService)
    {
        _carService = carService;
        _availabilityService = availabilityService;
        _reviewService = reviewService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20) =>
        FromResult(await _carService.GetActiveListingsAsync(page, pageSize));

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] CarSearchQueryDto query) =>
        FromResult(await _carService.SearchAsync(query));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long id) =>
        FromResult(await _carService.GetByIdAsync(id));

    [HttpPost]
    [Authorize(Roles = "CarOwner")]
    public async Task<IActionResult> Create([FromBody] CreateCarPostRequestDto dto) =>
        FromResult(await _carService.CreateAsync(dto, CurrentUserId));

    [HttpPut("{id:long}")]
    [Authorize(Roles = "CarOwner")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateCarPostRequestDto dto) =>
        FromResult(await _carService.UpdateAsync(id, dto, CurrentUserId));

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "CarOwner,Admin")]
    public async Task<IActionResult> Delete(long id) =>
        FromResult(await _carService.DeleteAsync(id, CurrentUserId, CurrentUserRole));

    // ─── Availability ────────────────────────────────────────
    [HttpGet("{id:long}/availability")]
    public async Task<IActionResult> GetAvailability(long id) =>
        FromResult(await _availabilityService.GetAvailabilityAsync(id));

    [HttpPost("{id:long}/availability")]
    [Authorize(Roles = "CarOwner")]
    public async Task<IActionResult> SetAvailability(long id, [FromBody] SetAvailabilityRequestDto dto) =>
        FromResult(await _availabilityService.SetAvailabilityAsync(id, dto, CurrentUserId));

    [HttpPut("{id:long}/availability")]
    [Authorize(Roles = "CarOwner")]
    public async Task<IActionResult> UpdateAvailability(long id, [FromBody] SetAvailabilityRequestDto dto) =>
        FromResult(await _availabilityService.UpdateAvailabilityAsync(id, dto, CurrentUserId));

    // ─── Reviews ─────────────────────────────────────────────
    [HttpGet("{id:long}/reviews")]
    public async Task<IActionResult> GetReviews(long id) =>
        FromResult(await _reviewService.GetByCarIdAsync(id));
}

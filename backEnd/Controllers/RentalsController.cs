using BackEnd.DTOs.Rental;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/rentals")]
[Authorize]
public class RentalsController : ApiController
{
    private readonly IRentalService _rentalService;

    public RentalsController(IRentalService rentalService) => _rentalService = rentalService;

    [HttpPost]
    [Authorize(Roles = "Renter")]
    public async Task<IActionResult> Create([FromBody] CreateRentalRequestDto dto) =>
        FromResult(await _rentalService.CreateAsync(dto, CurrentUserId));

    [HttpGet("my")]
    [Authorize(Roles = "Renter")]
    public async Task<IActionResult> GetMyRentals() =>
        FromResult(await _rentalService.GetMyRentalsAsync(CurrentUserId));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long id) =>
        FromResult(await _rentalService.GetByIdAsync(id, CurrentUserId, CurrentUserRole));

    [HttpPatch("{id:long}/complete")]
    [Authorize(Roles = "CarOwner,Admin")]
    public async Task<IActionResult> Complete(long id) =>
        FromResult(await _rentalService.CompleteRentalAsync(id, CurrentUserId, CurrentUserRole));

    [HttpDelete("{id:long}")]
    [Authorize(Roles = "Renter")]
    public async Task<IActionResult> Cancel(long id) =>
        FromResult(await _rentalService.CancelRentalAsync(id, CurrentUserId));
}

using BackEnd.DTOs.Rental;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/owner")]
[Authorize(Roles = "CarOwner")]
public class OwnerController : ApiController
{
    private readonly ICarPostService _carService;
    private readonly IRentalService _rentalService;

    public OwnerController(ICarPostService carService, IRentalService rentalService)
    {
        _carService = carService;
        _rentalService = rentalService;
    }

    [HttpGet("cars")]
    public async Task<IActionResult> GetMyCars() =>
        FromResult(await _carService.GetOwnerCarsAsync(CurrentUserId));

    [HttpGet("rentals")]
    public async Task<IActionResult> GetRentals() =>
        FromResult(await _rentalService.GetOwnerRentalsAsync(CurrentUserId));

    [HttpPatch("rentals/{id:long}/accept")]
    public async Task<IActionResult> AcceptRental(long id) =>
        FromResult(await _rentalService.AcceptRentalAsync(id, CurrentUserId));

    [HttpPatch("rentals/{id:long}/reject")]
    public async Task<IActionResult> RejectRental(long id, [FromBody] RejectRentalRequestDto dto) =>
        FromResult(await _rentalService.RejectRentalAsync(id, dto.Reason, CurrentUserId));
}

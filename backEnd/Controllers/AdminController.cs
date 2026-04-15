using BackEnd.DTOs.Car;
using BackEnd.DTOs.License;
using BackEnd.DTOs.User;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BackEnd.DTOs.Rental;

namespace BackEnd.Controllers;

[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ApiController
{
    private readonly IUserAdminService _userService;
    private readonly ICarPostService _carService;
    private readonly IDriverLicenseService _licenseService;
    private readonly IRentalService _rentalService;
    private readonly IAdminStatsService _statsService;

    public AdminController(IUserAdminService userService, ICarPostService carService,
        IDriverLicenseService licenseService, IRentalService rentalService,
        IAdminStatsService statsService)
    {
        _userService = userService;
        _carService = carService;
        _licenseService = licenseService;
        _rentalService = rentalService;
        _statsService = statsService;
    }

    // ─── Users ───────────────────────────────────────────────
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers() =>
        FromResult(await _userService.GetAllUsersAsync());

    [HttpGet("users/pending-owners")]
    public async Task<IActionResult> GetPendingOwners() =>
        FromResult(await _userService.GetPendingOwnersAsync());

    [HttpGet("users/{id:long}")]
    public async Task<IActionResult> GetUser(long id) =>
        FromResult(await _userService.GetUserByIdAsync(id));

    [HttpPatch("users/{id:long}/approve")]
    public async Task<IActionResult> ApproveUser(long id) =>
        FromResult(await _userService.ApproveUserAsync(id, CurrentUserId));

    [HttpPatch("users/{id:long}/reject")]
    public async Task<IActionResult> RejectUser(long id, [FromBody] RejectUserRequestDto dto) =>
        FromResult(await _userService.RejectUserAsync(id, dto.Reason, CurrentUserId));

    [HttpDelete("users/{id:long}")]
    public async Task<IActionResult> DeleteUser(long id) =>
        FromResult(await _userService.DeleteUserAsync(id));

    // ─── Car Posts ───────────────────────────────────────────
    [HttpGet("cars/pending")]
    public async Task<IActionResult> GetPendingCars() =>
        FromResult(await _carService.GetPendingCarsAsync());

    [HttpPatch("cars/{id:long}/approve")]
    public async Task<IActionResult> ApproveCar(long id) =>
        FromResult(await _carService.ApproveCarAsync(id, CurrentUserId));

    [HttpPatch("cars/{id:long}/reject")]
    public async Task<IActionResult> RejectCar(long id, [FromBody] RejectCarRequestDto dto) =>
        FromResult(await _carService.RejectCarAsync(id, dto.Reason, CurrentUserId));

    // ─── Licenses ────────────────────────────────────────────
    [HttpGet("licenses")]
    public async Task<IActionResult> GetLicenses() =>
        FromResult(await _licenseService.GetAllLicensesAsync());

    [HttpPatch("licenses/{id:long}/verify")]
    public async Task<IActionResult> VerifyLicense(long id) =>
        FromResult(await _licenseService.VerifyLicenseAsync(id, CurrentUserId));

    [HttpPatch("licenses/{id:long}/reject")]
    public async Task<IActionResult> RejectLicense(long id, [FromBody] RejectLicenseRequestDto dto) =>
        FromResult(await _licenseService.RejectLicenseAsync(id, dto.Reason, CurrentUserId));

    [HttpPatch("users/{id:long}/promote")]
    public async Task<IActionResult> PromoteToAdmin(long id) =>
        FromResult(await _userService.promoteToAdminAsync(id));

    // ─── Stats ───────────────────────────────────────────────
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats() =>
        FromResult(await _statsService.GetDashboardStatsAsync());

    // ─── All Rentals ─────────────────────────────────────────
    [HttpGet("rentals")]
    public async Task<IActionResult> GetAllRentals() =>
        FromResult(await _rentalService.GetAllRentalsAsync());
}

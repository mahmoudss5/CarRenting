using BackEnd.DTOs.License;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/renter")]
[Authorize(Roles = "Renter")]
public class RenterController : ApiController
{
    private readonly IDriverLicenseService _licenseService;
    private readonly IReviewService _reviewService;

    public RenterController(IDriverLicenseService licenseService, IReviewService reviewService)
    {
        _licenseService = licenseService;
        _reviewService = reviewService;
    }

    [HttpPost("license")]
    public async Task<IActionResult> SubmitLicense([FromBody] SubmitLicenseRequestDto dto) =>
        FromResult(await _licenseService.SubmitLicenseAsync(dto, CurrentUserId));


    [HttpPost("license/images")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadLicenseImages(
        IFormFile front_image, IFormFile back_image) =>
        FromResult(await _licenseService.UploadLicenseImagesAsync(front_image, back_image, CurrentUserId));

    [HttpGet("license")]
    public async Task<IActionResult> GetLicense() =>
        FromResult(await _licenseService.GetMyLicenseAsync(CurrentUserId));

    [HttpGet("reviews")]
    public async Task<IActionResult> GetMyReviews() =>
        FromResult(await _reviewService.GetMyReviewsAsync(CurrentUserId));
}

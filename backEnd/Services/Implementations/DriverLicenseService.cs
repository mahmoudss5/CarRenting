using BackEnd.Common;
using BackEnd.DTOs.License;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class DriverLicenseService : IDriverLicenseService
{
    private readonly IDriverLicenseRepository _licenses;
    private readonly IRenterRepository _renters;
    private readonly IAdminActionRepository _adminActions;
    private readonly INotificationService _notifications;

    public DriverLicenseService(IDriverLicenseRepository licenses, IRenterRepository renters,
        IAdminActionRepository adminActions, INotificationService notifications)
    {
        _licenses = licenses;
        _renters = renters;
        _adminActions = adminActions;
        _notifications = notifications;
    }

    public async Task<ResponResult<LicenseSubmittedResponseDto>> SubmitLicenseAsync(SubmitLicenseRequestDto dto, long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null) return ResponResult<LicenseSubmittedResponseDto>.Forbidden("Only Renters can submit a license.");

        var existing = await _licenses.GetByRenterIdAsync(renter.Id);
        if (existing is not null)
            return ResponResult<LicenseSubmittedResponseDto>.Fail("A license is already submitted.");

        var license = new DriverLicense
        {
            RenterId = renter.Id,
            LicenseNumber = dto.LicenseNumber,
            IssuingCountry = dto.IssuingCountry,
            ExpiryDate = dto.ExpiryDate,
            VerificationStatus = "Pending"
        };

        license = await _licenses.CreateAsync(license);

        return ResponResult<LicenseSubmittedResponseDto>.Created(new LicenseSubmittedResponseDto
        {
            Message = "License submitted successfully. Awaiting verification.",
            License = MapToDto(license)
        });
    }

    public async Task<ResponResult<LicenseResponseDto>> GetMyLicenseAsync(long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null) return ResponResult<LicenseResponseDto>.Forbidden("Only Renters can access this.");

        var license = await _licenses.GetByRenterIdAsync(renter.Id);
        if (license is null) return ResponResult<LicenseResponseDto>.NotFound("No license submitted yet.");

        return ResponResult<LicenseResponseDto>.Ok(MapToDto(license));
    }

    public async Task<ResponResult<object>> GetAllLicensesAsync()
    {
        var licenses = await _licenses.GetAllAsync();
        var items = licenses.Select(l => new AdminLicenseItemDto
        {
            LicenseId = l.Id,
            RenterName = $"{l.Renter.User.FirstName} {l.Renter.User.LastName}".Trim(),
            LicenseNumber = l.LicenseNumber,
            IssuingCountry = l.IssuingCountry,
            ExpiryDate = l.ExpiryDate,
            VerificationStatus = l.VerificationStatus,
            SubmittedAt = l.CreatedAt
        }).ToList();

        return ResponResult<object>.Ok(new { licenses = items, total = items.Count });
    }

    public async Task<ResponResult<LicenseActionResponseDto>> VerifyLicenseAsync(long licenseId, long adminId)
    {
        var license = await _licenses.GetByIdAsync(licenseId);
        if (license is null) return ResponResult<LicenseActionResponseDto>.NotFound("License not found.");

        license.VerificationStatus = "Verified";
        license.VerifiedAt = DateTime.UtcNow;
        license.VerifiedByAdminId = adminId;
        await _licenses.UpdateAsync(license);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "DriverLicense",
            EntityId = licenseId,
            Action = "Approve"
        });

        await _notifications.CreateAsync(license.Renter.UserId, "LicenseVerified",
            "Your driver license has been verified. You can now book cars.",
            referenceId: licenseId);

        return ResponResult<LicenseActionResponseDto>.Ok(new LicenseActionResponseDto
        {
            Message = "Driver license verified successfully.",
            LicenseId = licenseId,
            VerificationStatus = "Verified"
        });
    }

    public async Task<ResponResult<LicenseActionResponseDto>> RejectLicenseAsync(long licenseId, string reason, long adminId)
    {
        var license = await _licenses.GetByIdAsync(licenseId);
        if (license is null) return ResponResult<LicenseActionResponseDto>.NotFound("License not found.");

        license.VerificationStatus = "Rejected";
        await _licenses.UpdateAsync(license);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "DriverLicense",
            EntityId = licenseId,
            Action = "Reject",
            Reason = reason
        });

        return ResponResult<LicenseActionResponseDto>.Ok(new LicenseActionResponseDto
        {
            Message = "Driver license rejected.",
            LicenseId = licenseId,
            VerificationStatus = "Rejected"
        });
    }

    private static LicenseResponseDto MapToDto(DriverLicense l) => new()
    {
        LicenseId = l.Id,
        LicenseNumber = l.LicenseNumber,
        IssuingCountry = l.IssuingCountry,
        ExpiryDate = l.ExpiryDate,
        VerificationStatus = l.VerificationStatus,
        SubmittedAt = l.CreatedAt
    };
}

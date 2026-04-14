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
    private readonly IFileStorageService _fileStorage;

    public DriverLicenseService(IDriverLicenseRepository licenses, IRenterRepository renters,
        IAdminActionRepository adminActions, INotificationService notifications,
        IFileStorageService fileStorage)
    {
        _licenses = licenses;
        _renters = renters;
        _adminActions = adminActions;
        _notifications = notifications;
        _fileStorage = fileStorage;
    }

    public async Task<ResponResult<LicenseSubmittedResponseDto>> SubmitLicenseAsync(SubmitLicenseRequestDto dto, long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null) return ResponResult<LicenseSubmittedResponseDto>.Forbidden("Only Renters can submit a license.");

        var existing = await _licenses.GetByRenterIdAsync(renter.Id);
        if (existing is not null)
        {
            if (existing.VerificationStatus != "Rejected")
                return ResponResult<LicenseSubmittedResponseDto>.Fail("A license is already submitted.");

            existing.LicenseNumber = dto.LicenseNumber;
            existing.IssuingCountry = dto.IssuingCountry;
            existing.ExpiryDate = dto.ExpiryDate;
            existing.VerificationStatus = "Pending";
            existing.VerifiedAt = null;
            existing.VerifiedByAdminId = null;
            await _licenses.UpdateAsync(existing);

            return ResponResult<LicenseSubmittedResponseDto>.Ok(new LicenseSubmittedResponseDto
            {
                Message = "License resubmitted successfully. Awaiting verification.",
                License = MapToDto(existing)
            });
        }

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

    public async Task<ResponResult<LicenseResponseDto>> UploadLicenseImagesAsync(
        IFormFile frontImage, IFormFile backImage, long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null)
            return ResponResult<LicenseResponseDto>.Forbidden("Only Renters can upload license images.");

        var license = await _licenses.GetByRenterIdAsync(renter.Id);
        if (license is null)
            return ResponResult<LicenseResponseDto>.NotFound("No license found. Submit your license details first.");

        var subFolder = $"licenses/{renter.Id}";

        try
        {
            // Delete old images before saving new ones
            _fileStorage.Delete(license.FrontImageUrl);
            _fileStorage.Delete(license.BackImageUrl);

            license.FrontImageUrl = await _fileStorage.SaveAsync(frontImage, subFolder);
            license.BackImageUrl  = await _fileStorage.SaveAsync(backImage,  subFolder);
        }
        catch (ArgumentException ex)
        {
            return ResponResult<LicenseResponseDto>.Fail(ex.Message);
        }

        await _licenses.UpdateAsync(license);

        await _notifications.CreateAsync(
            renter.UserId,
            "LicenseImagesUploaded",
            "Your driver license images have been uploaded and are awaiting admin review.",
            referenceId: license.Id);

        return ResponResult<LicenseResponseDto>.Ok(MapToDto(license));
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
        license.VerifiedAt = null;
        license.VerifiedByAdminId = null;
        await _licenses.UpdateAsync(license);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "DriverLicense",
            EntityId = licenseId,
            Action = "Reject",
            Reason = reason
        });

        await _notifications.CreateAsync(license.Renter.UserId, "LicenseRejected",
            $"Your driver license was rejected. Reason: {reason}",
            referenceId: licenseId, referenceType: "DriverLicense");

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
        FrontImageUrl = string.IsNullOrEmpty(l.FrontImageUrl) ? null : l.FrontImageUrl,
        BackImageUrl  = string.IsNullOrEmpty(l.BackImageUrl)  ? null : l.BackImageUrl,
        VerificationStatus = l.VerificationStatus,
        SubmittedAt = l.CreatedAt
    };
}

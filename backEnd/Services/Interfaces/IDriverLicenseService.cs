using BackEnd.Common;
using BackEnd.DTOs.License;

namespace BackEnd.Services.Interfaces;

public interface IDriverLicenseService
{
    Task<ResponResult<LicenseSubmittedResponseDto>> SubmitLicenseAsync(SubmitLicenseRequestDto dto, long userId);
    Task<ResponResult<LicenseResponseDto>> GetMyLicenseAsync(long userId);
    Task<ResponResult<object>> GetAllLicensesAsync();
    Task<ResponResult<LicenseActionResponseDto>> VerifyLicenseAsync(long licenseId, long adminId);
    Task<ResponResult<LicenseActionResponseDto>> RejectLicenseAsync(long licenseId, string reason, long adminId);
}

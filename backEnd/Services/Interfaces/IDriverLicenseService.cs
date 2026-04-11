using BackEnd.Common;
using BackEnd.DTOs.License;

namespace BackEnd.Services.Interfaces;

public interface IDriverLicenseService
{
    Task<ServiceResult<LicenseSubmittedResponseDto>> SubmitLicenseAsync(SubmitLicenseRequestDto dto, long userId);
    Task<ServiceResult<LicenseResponseDto>> GetMyLicenseAsync(long userId);
    Task<ServiceResult<object>> GetAllLicensesAsync();
    Task<ServiceResult<LicenseActionResponseDto>> VerifyLicenseAsync(long licenseId, long adminId);
    Task<ServiceResult<LicenseActionResponseDto>> RejectLicenseAsync(long licenseId, string reason, long adminId);
}

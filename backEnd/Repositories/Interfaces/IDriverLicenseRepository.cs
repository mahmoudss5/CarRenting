using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IDriverLicenseRepository
{
    Task<DriverLicense?> GetByIdAsync(long id);
    Task<DriverLicense?> GetByRenterIdAsync(long renterId);
    Task<IEnumerable<DriverLicense>> GetAllAsync();
    Task<DriverLicense> CreateAsync(DriverLicense license);
    Task UpdateAsync(DriverLicense license);
    Task<bool> HasVerifiedLicenseAsync(long renterId);
}

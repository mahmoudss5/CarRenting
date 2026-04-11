using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IRentalRequestRepository
{
    Task<RentalRequest?> GetByIdAsync(long id);
    Task<RentalRequest?> GetByIdWithDetailsAsync(long id);
    Task<IEnumerable<RentalRequest>> GetByRenterIdAsync(long renterId);
    Task<IEnumerable<RentalRequest>> GetByCarOwnerIdAsync(long carOwnerId);
    Task<bool> HasOverlappingAcceptedRentalAsync(long carPostId, DateOnly startDate, DateOnly endDate);
    Task<RentalRequest> CreateAsync(RentalRequest request);
    Task UpdateAsync(RentalRequest request);
    Task DeleteAsync(RentalRequest request);
}

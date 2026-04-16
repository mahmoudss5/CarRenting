using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface ICarPostRepository
{
    Task<CarPost?> GetByIdAsync(long id);
    Task<CarPost?> GetByIdWithDetailsAsync(long id);
    Task<IEnumerable<CarPost>> GetActiveListingsAsync(int page, int pageSize);
    Task<int> CountActiveListingsAsync();
    Task<IEnumerable<CarPost>> SearchAsync(string? type, string? brand, string? location, decimal? minPrice, decimal? maxPrice, int page, int pageSize);
    Task<int> CountSearchAsync(string? type, string? brand, string? location, decimal? minPrice, decimal? maxPrice);
    Task<IEnumerable<CarPost>> GetByOwnerIdAsync(long ownerId);
    Task<IEnumerable<CarPost>> GetPendingAsync();
    Task<IEnumerable<CarPost>> GetAllForAdminAsync();
    Task<CarPost> CreateAsync(CarPost carPost);
    Task UpdateAsync(CarPost carPost);
    Task DeleteAsync(CarPost carPost);
}

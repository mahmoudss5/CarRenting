using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IRenterRepository
{
    Task<Renter?> GetByIdAsync(long id);
    Task<Renter?> GetByUserIdAsync(long userId);
    Task<Renter> CreateAsync(Renter renter);
}

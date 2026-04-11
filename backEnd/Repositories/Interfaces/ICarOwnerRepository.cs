using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface ICarOwnerRepository
{
    Task<CarOwner?> GetByIdAsync(long id);
    Task<CarOwner?> GetByUserIdAsync(long userId);
    Task<CarOwner> CreateAsync(CarOwner carOwner);
    Task UpdateAsync(CarOwner carOwner);
}

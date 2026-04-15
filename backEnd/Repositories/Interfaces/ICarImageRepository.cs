using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface ICarImageRepository
{
    Task<CarImage?> GetByIdAsync(long id);
    Task<IEnumerable<CarImage>> GetByCarPostIdAsync(long carPostId);
    Task<CarImage> CreateAsync(CarImage image);
    Task DeleteAsync(CarImage image);
}

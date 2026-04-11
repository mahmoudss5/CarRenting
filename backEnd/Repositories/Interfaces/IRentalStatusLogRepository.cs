using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IRentalStatusLogRepository
{
    Task CreateAsync(RentalStatusLog log);
}

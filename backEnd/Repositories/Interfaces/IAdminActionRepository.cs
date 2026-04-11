using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IAdminActionRepository
{
    Task CreateAsync(AdminAction action);
}

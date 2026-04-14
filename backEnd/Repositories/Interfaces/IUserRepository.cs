using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(long id);
    Task<User?> GetByEmailAsync(string email);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> CreateAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(User user);
    Task<bool> ExistsByEmailAsync(string email);
    Task<IEnumerable<User>> GetByRoleAndStatusAsync(string role, string status);
}

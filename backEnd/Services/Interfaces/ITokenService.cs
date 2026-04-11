using BackEnd.Models;

namespace BackEnd.Services.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}

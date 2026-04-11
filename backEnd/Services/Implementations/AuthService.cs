using BackEnd.Common;
using BackEnd.DTOs.Auth;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class AuthService : IAuthService
{
    private readonly IUserRepository _users;
    private readonly ICarOwnerRepository _carOwners;
    private readonly IRenterRepository _renters;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository users, ICarOwnerRepository carOwners,
        IRenterRepository renters, ITokenService tokenService)
    {
        _users = users;
        _carOwners = carOwners;
        _renters = renters;
        _tokenService = tokenService;
    }

    public async Task<ServiceResult<RegisterResponseDto>> RegisterAsync(RegisterRequestDto dto)
    {
        if (dto.Role != "CarOwner" && dto.Role != "Renter")
            return ServiceResult<RegisterResponseDto>.Fail("Role must be 'CarOwner' or 'Renter'.");

        if (await _users.ExistsByEmailAsync(dto.Email))
            return ServiceResult<RegisterResponseDto>.Fail("Email is already registered.");

        var parts = dto.FullName.Trim().Split(' ', 2);
        var user = new User
        {
            FirstName = parts[0],
            LastName = parts.Length > 1 ? parts[1] : "",
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            AccountStatus = "Pending"
        };

        user = await _users.CreateAsync(user);

        if (dto.Role == "CarOwner")
            await _carOwners.CreateAsync(new CarOwner { UserId = user.Id });
        else
            await _renters.CreateAsync(new Renter { UserId = user.Id });

        return ServiceResult<RegisterResponseDto>.Created(new RegisterResponseDto
        {
            Message = "Account created successfully. Awaiting admin approval.",
            User = MapToAuthDto(user)
        });
    }

    public async Task<ServiceResult<LoginResponseDto>> LoginAsync(LoginRequestDto dto)
    {
        var user = await _users.GetByEmailAsync(dto.Email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return ServiceResult<LoginResponseDto>.Fail("Invalid email or password.", 401);

        if (user.AccountStatus == "Suspended")
            return ServiceResult<LoginResponseDto>.Forbidden("Your account has been suspended.");

        if (user.AccountStatus == "Rejected")
            return ServiceResult<LoginResponseDto>.Forbidden("Your account registration was rejected.");

        return ServiceResult<LoginResponseDto>.Ok(new LoginResponseDto
        {
            Token = _tokenService.GenerateToken(user),
            User = MapToAuthDto(user)
        });
    }

    public async Task<ServiceResult<MeResponseDto>> GetMeAsync(long userId)
    {
        var user = await _users.GetByIdAsync(userId);
        if (user is null) return ServiceResult<MeResponseDto>.NotFound("User not found.");

        return ServiceResult<MeResponseDto>.Ok(new MeResponseDto
        {
            UserId = user.Id,
            FullName = $"{user.FirstName} {user.LastName}".Trim(),
            Email = user.Email,
            Role = user.Role,
            Status = user.AccountStatus,
            CreatedAt = user.CreatedAt
        });
    }

    private static UserAuthDto MapToAuthDto(User u) => new()
    {
        UserId = u.Id,
        FullName = $"{u.FirstName} {u.LastName}".Trim(),
        Email = u.Email,
        Role = u.Role,
        Status = u.AccountStatus
    };
}

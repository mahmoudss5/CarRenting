using BackEnd.DTOs.Auth;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/auth")]
public class AuthController : ApiController
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth) => _auth = auth;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto) =>
        FromResult(await _auth.RegisterAsync(dto));

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto) =>
        FromResult(await _auth.LoginAsync(dto));

    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout() =>
        Ok(new { message = "Logged out successfully." });

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me() =>
        FromResult(await _auth.GetMeAsync(CurrentUserId));
}

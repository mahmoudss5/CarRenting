using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data;

public static class DbSeeder
{
    private const string AdminEmail = "admin@gmial.com";
    private const string AdminPassword = "admin1234";
    private const string AdminRole = "Admin";

    // generating the admin account if not exist
    
    public static async Task SeedAdminAsync(IServiceProvider services)
    {
        await using var scope = services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var adminExists = await db.Users
            .AnyAsync(u => u.Email == AdminEmail && u.Role == AdminRole);

        if (adminExists) return;

        var admin = new User
        {
            FirstName = "Admin",
            LastName = "System",
            Email = AdminEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(AdminPassword),
            Role = AdminRole,
            AccountStatus = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.Users.Add(admin);
        await db.SaveChangesAsync();
    }
}

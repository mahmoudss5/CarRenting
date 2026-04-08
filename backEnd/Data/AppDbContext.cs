using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<WeatherForecast> WeatherForecasts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<WeatherForecast>().HasData(
            new WeatherForecast { Id = 1, Date = new DateOnly(2025, 1, 1), TemperatureC = 5, Summary = "Freezing" },
            new WeatherForecast { Id = 2, Date = new DateOnly(2025, 1, 2), TemperatureC = 15, Summary = "Bracing" },
            new WeatherForecast { Id = 3, Date = new DateOnly(2025, 1, 3), TemperatureC = 25, Summary = "Warm" }
        );
    }
}

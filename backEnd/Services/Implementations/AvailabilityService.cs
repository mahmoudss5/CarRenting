using BackEnd.Common;
using BackEnd.DTOs.Availability;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class AvailabilityService : IAvailabilityService
{
    private readonly IAvailabilityCalendarRepository _repo;
    private readonly ICarPostRepository _carPosts;
    private readonly ICarOwnerRepository _carOwners;

    public AvailabilityService(IAvailabilityCalendarRepository repo,
        ICarPostRepository carPosts, ICarOwnerRepository carOwners)
    {
        _repo = repo;
        _carPosts = carPosts;
        _carOwners = carOwners;
    }

    public async Task<ServiceResult<CarAvailabilityResponseDto>> GetAvailabilityAsync(long carPostId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ServiceResult<CarAvailabilityResponseDto>.NotFound("Car post not found.");

        var entries = await _repo.GetByCarPostIdAsync(carPostId);
        var availability = entries.Select(a => new AvailabilityItemDto
        {
            Date = a.CalendarDate,
            IsAvailable = a.IsAvailable
        }).ToList();

        return ServiceResult<CarAvailabilityResponseDto>.Ok(new CarAvailabilityResponseDto
        {
            PostId = carPostId,
            Availability = availability
        });
    }

    public async Task<ServiceResult<object>> SetAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId)
    {
        var result = await VerifyOwnership(carPostId, userId);
        if (result is not null) return result;

        var entries = dto.Dates.Select(d => new AvailabilityCalendar
        {
            CarPostId = carPostId,
            CalendarDate = d.Date,
            IsAvailable = d.IsAvailable
        });

        await _repo.UpsertRangeAsync(carPostId, entries);
        return ServiceResult<object>.Created(new { message = "Availability dates set successfully.", post_id = carPostId });
    }

    public async Task<ServiceResult<object>> UpdateAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId)
    {
        var result = await VerifyOwnership(carPostId, userId);
        if (result is not null) return result;

        var entries = dto.Dates.Select(d => new AvailabilityCalendar
        {
            CarPostId = carPostId,
            CalendarDate = d.Date,
            IsAvailable = d.IsAvailable
        });

        await _repo.UpsertRangeAsync(carPostId, entries);
        return ServiceResult<object>.Ok(new { message = "Availability updated successfully.", post_id = carPostId });
    }

    private async Task<ServiceResult<object>?> VerifyOwnership(long carPostId, long userId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ServiceResult<object>.NotFound("Car post not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || car.OwnerId != owner.Id)
            return ServiceResult<object>.Forbidden("You can only manage availability for your own cars.");

        return null;
    }
}

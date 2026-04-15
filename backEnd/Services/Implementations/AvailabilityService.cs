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
    private readonly IRentalRequestRepository _rentals;

    public AvailabilityService(IAvailabilityCalendarRepository repo,
        ICarPostRepository carPosts, ICarOwnerRepository carOwners, IRentalRequestRepository rentals)
    {
        _repo = repo;
        _carPosts = carPosts;
        _carOwners = carOwners;
        _rentals = rentals;
    }

    public async Task<ResponResult<CarAvailabilityResponseDto>> GetAvailabilityAsync(long carPostId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ResponResult<CarAvailabilityResponseDto>.NotFound("Car post not found.");

        var entries = await _repo.GetByCarPostIdAsync(carPostId);
        var availability = entries.Select(a => new AvailabilityItemDto
        {
            Date = a.CalendarDate,
            IsAvailable = a.IsAvailable
        }).ToList();

        return ResponResult<CarAvailabilityResponseDto>.Ok(new CarAvailabilityResponseDto
        {
            PostId = carPostId,
            Availability = availability
        });
    }

    public async Task<ResponResult<object>> SetAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId)
    {
        var result = await VerifyOwnership(carPostId, userId);
        if (result is not null) return result;

        var reopenBookedDatesResult = await ValidateNoBookedDatesAreReopened(carPostId, dto);
        if (reopenBookedDatesResult is not null) return reopenBookedDatesResult;

        var entries = dto.Dates.Select(d => new AvailabilityCalendar
        {
            CarPostId = carPostId,
            CalendarDate = d.Date,
            IsAvailable = d.IsAvailable
        });

        await _repo.UpsertRangeAsync(carPostId, entries);
        return ResponResult<object>.Created(new { message = "Availability dates set successfully.", post_id = carPostId });
    }

    public async Task<ResponResult<object>> UpdateAvailabilityAsync(long carPostId, SetAvailabilityRequestDto dto, long userId)
    {
        var result = await VerifyOwnership(carPostId, userId);
        if (result is not null) return result;

        var reopenBookedDatesResult = await ValidateNoBookedDatesAreReopened(carPostId, dto);
        if (reopenBookedDatesResult is not null) return reopenBookedDatesResult;

        var entries = dto.Dates.Select(d => new AvailabilityCalendar
        {
            CarPostId = carPostId,
            CalendarDate = d.Date,
            IsAvailable = d.IsAvailable
        });

        await _repo.UpsertRangeAsync(carPostId, entries);
        return ResponResult<object>.Ok(new { message = "Availability updated successfully.", post_id = carPostId });
    }

    private async Task<ResponResult<object>?> VerifyOwnership(long carPostId, long userId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ResponResult<object>.NotFound("Car post not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || car.OwnerId != owner.Id)
            return ResponResult<object>.Forbidden("You can only manage availability for your own cars.");
        if (owner.User.AccountStatus != "Active")
            return ResponResult<object>.Forbidden("Your owner account must be approved to manage availability.");

        return null;
    }

    private async Task<ResponResult<object>?> ValidateNoBookedDatesAreReopened(long carPostId, SetAvailabilityRequestDto dto)
    {
        var datesBeingSetAvailable = dto.Dates
            .Where(d => d.IsAvailable)
            .Select(d => d.Date)
            .Distinct()
            .ToList();

        foreach (var date in datesBeingSetAvailable)
        {
            var hasAcceptedRentalOnDate = await _rentals.HasOverlappingAcceptedRentalAsync(carPostId, date, date);
            if (hasAcceptedRentalOnDate)
            {
                return ResponResult<object>.Forbidden(
                    $"Cannot mark {date:yyyy-MM-dd} as available because it is already booked by an accepted rental.");
            }
        }

        return null;
    }
}

using BackEnd.Common;
using BackEnd.DTOs.Rental;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class RentalService : IRentalService
{
    private readonly IRentalRequestRepository _rentals;
    private readonly IRentalStatusLogRepository _statusLogs;
    private readonly ICarPostRepository _carPosts;
    private readonly IRenterRepository _renters;
    private readonly ICarOwnerRepository _carOwners;
    private readonly IDriverLicenseRepository _licenses;
    private readonly INotificationService _notifications;

    public RentalService(IRentalRequestRepository rentals, IRentalStatusLogRepository statusLogs,
        ICarPostRepository carPosts, IRenterRepository renters, ICarOwnerRepository carOwners,
        IDriverLicenseRepository licenses, INotificationService notifications)
    {
        _rentals = rentals;
        _statusLogs = statusLogs;
        _carPosts = carPosts;
        _renters = renters;
        _carOwners = carOwners;
        _licenses = licenses;
        _notifications = notifications;
    }

    public async Task<ServiceResult<RentalCreatedResponseDto>> CreateAsync(CreateRentalRequestDto dto, long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null) return ServiceResult<RentalCreatedResponseDto>.Forbidden("Only Renters can submit rental requests.");

        var hasLicense = await _licenses.HasVerifiedLicenseAsync(renter.Id);
        if (!hasLicense)
            return ServiceResult<RentalCreatedResponseDto>.Forbidden("You must submit and verify your driver license before booking.");

        var car = await _carPosts.GetByIdAsync(dto.PostId);
        if (car is null) return ServiceResult<RentalCreatedResponseDto>.NotFound("Car post not found.");
        if (car.PostStatus != "Active" || car.CarStatus != "Available")
            return ServiceResult<RentalCreatedResponseDto>.Fail("This car is not available for rental.");

        if (dto.EndDate < dto.StartDate)
            return ServiceResult<RentalCreatedResponseDto>.Fail("End date must be after start date.");

        var totalDays = (short)(dto.EndDate.DayNumber - dto.StartDate.DayNumber + 1);
        var totalPrice = car.PricePerDay * totalDays;

        var request = new RentalRequest
        {
            RenterId = renter.Id,
            CarPostId = dto.PostId,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            TotalDays = totalDays,
            TotalPrice = totalPrice,
            Status = "Pending"
        };

        request = await _rentals.CreateAsync(request);

        await _notifications.CreateAsync(car.Owner.UserId, "NewRentalRequest",
            $"{renter.User.FirstName} {renter.User.LastName} has requested to rent your {car.Brand} {car.Model}.",
            referenceId: request.Id, referenceType: "RentalRequest");

        return ServiceResult<RentalCreatedResponseDto>.Created(new RentalCreatedResponseDto
        {
            Message = "Rental request submitted successfully.",
            Rental = new RentalDataDto
            {
                RequestId = request.Id,
                PostId = request.CarPostId,
                RenterId = renter.Id,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                TotalPrice = request.TotalPrice,
                Status = request.Status,
                RequestedAt = request.CreatedAt
            }
        });
    }

    public async Task<ServiceResult<IEnumerable<RentalListItemDto>>> GetMyRentalsAsync(long userId)
    {
        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null) return ServiceResult<IEnumerable<RentalListItemDto>>.Forbidden("Only Renters can access this.");

        var requests = await _rentals.GetByRenterIdAsync(renter.Id);
        var items = requests.Select(r => new RentalListItemDto
        {
            RequestId = r.Id,
            CarTitle = r.CarPost.Title,
            StartDate = r.StartDate,
            EndDate = r.EndDate,
            TotalPrice = r.TotalPrice,
            Status = r.Status,
            RequestedAt = r.CreatedAt
        });

        return ServiceResult<IEnumerable<RentalListItemDto>>.Ok(items);
    }

    public async Task<ServiceResult<RentalDetailDto>> GetByIdAsync(long id, long userId, string userRole)
    {
        var request = await _rentals.GetByIdWithDetailsAsync(id);
        if (request is null) return ServiceResult<RentalDetailDto>.NotFound("Rental request not found.");

        if (userRole == "Admin") { /* admin can see any */ }
        else if (userRole == "Renter")
        {
            var renter = await _renters.GetByUserIdAsync(userId);
            if (renter is null || request.RenterId != renter.Id)
                return ServiceResult<RentalDetailDto>.Forbidden("Access denied.");
        }
        else if (userRole == "CarOwner")
        {
            var owner = await _carOwners.GetByUserIdAsync(userId);
            if (owner is null || request.CarPost.OwnerId != owner.Id)
                return ServiceResult<RentalDetailDto>.Forbidden("Access denied.");
        }

        return ServiceResult<RentalDetailDto>.Ok(new RentalDetailDto
        {
            RequestId = request.Id,
            RenterName = $"{request.Renter.User.FirstName} {request.Renter.User.LastName}".Trim(),
            CarTitle = request.CarPost.Title,
            PostId = request.CarPostId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            TotalPrice = request.TotalPrice,
            Status = request.Status,
            RequestedAt = request.CreatedAt,
            UpdatedAt = request.UpdatedAt
        });
    }

    public async Task<ServiceResult<IEnumerable<OwnerRentalDto>>> GetOwnerRentalsAsync(long userId)
    {
        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null) return ServiceResult<IEnumerable<OwnerRentalDto>>.Forbidden("Only Car Owners can access this.");

        var requests = await _rentals.GetByCarOwnerIdAsync(owner.Id);
        var items = requests.Select(r => new OwnerRentalDto
        {
            RequestId = r.Id,
            RenterName = $"{r.Renter.User.FirstName} {r.Renter.User.LastName}".Trim(),
            CarTitle = r.CarPost.Title,
            StartDate = r.StartDate,
            EndDate = r.EndDate,
            TotalPrice = r.TotalPrice,
            Status = r.Status,
            RequestedAt = r.CreatedAt
        });

        return ServiceResult<IEnumerable<OwnerRentalDto>>.Ok(items);
    }

    public async Task<ServiceResult<RentalActionResponseDto>> AcceptRentalAsync(long id, long userId)
    {
        var request = await _rentals.GetByIdWithDetailsAsync(id);
        if (request is null) return ServiceResult<RentalActionResponseDto>.NotFound("Rental request not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || request.CarPost.OwnerId != owner.Id)
            return ServiceResult<RentalActionResponseDto>.Forbidden("Access denied.");

        if (request.Status != "Pending")
            return ServiceResult<RentalActionResponseDto>.Fail($"Cannot accept a request with status '{request.Status}'.");

        var fromStatus = request.Status;
        request.Status = "Accepted";
        request.CarPost.CarStatus = "Rented";
        await _rentals.UpdateAsync(request);
        await _carPosts.UpdateAsync(request.CarPost);

        await _statusLogs.CreateAsync(new RentalStatusLog
        {
            RentalRequestId = request.Id,
            FromStatus = fromStatus,
            ToStatus = "Accepted",
            ChangedByUserId = userId
        });

        await _notifications.CreateAsync(request.Renter.UserId, "RequestAccepted",
            $"Your rental request for {request.CarPost.Title} has been accepted!",
            referenceId: request.Id, referenceType: "RentalRequest");

        return ServiceResult<RentalActionResponseDto>.Ok(new RentalActionResponseDto
        {
            Message = "Rental request accepted. Car is now marked as Rented.",
            RequestId = request.Id,
            Status = "Accepted",
            CarRentalStatus = "Rented"
        });
    }

    public async Task<ServiceResult<RentalActionResponseDto>> RejectRentalAsync(long id, string reason, long userId)
    {
        var request = await _rentals.GetByIdWithDetailsAsync(id);
        if (request is null) return ServiceResult<RentalActionResponseDto>.NotFound("Rental request not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || request.CarPost.OwnerId != owner.Id)
            return ServiceResult<RentalActionResponseDto>.Forbidden("Access denied.");

        if (request.Status != "Pending")
            return ServiceResult<RentalActionResponseDto>.Fail($"Cannot reject a request with status '{request.Status}'.");

        var fromStatus = request.Status;
        request.Status = "Rejected";
        request.RejectionReason = reason;
        await _rentals.UpdateAsync(request);

        await _statusLogs.CreateAsync(new RentalStatusLog
        {
            RentalRequestId = request.Id,
            FromStatus = fromStatus,
            ToStatus = "Rejected",
            ChangedByUserId = userId
        });

        await _notifications.CreateAsync(request.Renter.UserId, "RequestRejected",
            $"Your rental request for {request.CarPost.Title} was rejected. Reason: {reason}",
            referenceId: request.Id, referenceType: "RentalRequest");

        return ServiceResult<RentalActionResponseDto>.Ok(new RentalActionResponseDto
        {
            Message = "Rental request rejected.",
            RequestId = request.Id,
            Status = "Rejected"
        });
    }

    public async Task<ServiceResult<RentalActionResponseDto>> CompleteRentalAsync(long id, long userId, string userRole)
    {
        var request = await _rentals.GetByIdWithDetailsAsync(id);
        if (request is null) return ServiceResult<RentalActionResponseDto>.NotFound("Rental request not found.");

        if (userRole == "CarOwner")
        {
            var owner = await _carOwners.GetByUserIdAsync(userId);
            if (owner is null || request.CarPost.OwnerId != owner.Id)
                return ServiceResult<RentalActionResponseDto>.Forbidden("Access denied.");
        }

        if (request.Status != "Accepted")
            return ServiceResult<RentalActionResponseDto>.Fail("Only accepted rentals can be completed.");

        var fromStatus = request.Status;
        request.Status = "Completed";
        request.CarPost.CarStatus = "Available";
        await _rentals.UpdateAsync(request);
        await _carPosts.UpdateAsync(request.CarPost);

        await _statusLogs.CreateAsync(new RentalStatusLog
        {
            RentalRequestId = request.Id,
            FromStatus = fromStatus,
            ToStatus = "Completed",
            ChangedByUserId = userId
        });

        await _notifications.CreateAsync(request.Renter.UserId, "RentalCompleted",
            $"Your rental of {request.CarPost.Title} is now completed. You can leave a review!",
            referenceId: request.Id, referenceType: "RentalRequest");

        return ServiceResult<RentalActionResponseDto>.Ok(new RentalActionResponseDto
        {
            Message = "Rental marked as completed. Renter can now leave a review.",
            RequestId = request.Id,
            Status = "Completed",
            CarRentalStatus = "Available"
        });
    }

    public async Task<ServiceResult<object>> CancelRentalAsync(long id, long userId)
    {
        var request = await _rentals.GetByIdWithDetailsAsync(id);
        if (request is null) return ServiceResult<object>.NotFound("Rental request not found.");

        var renter = await _renters.GetByUserIdAsync(userId);
        if (renter is null || request.RenterId != renter.Id)
            return ServiceResult<object>.Forbidden("Access denied.");

        if (request.Status == "Accepted")
            return ServiceResult<object>.Forbidden("Cannot cancel a rental request that has already been accepted.");

        var fromStatus = request.Status;
        request.Status = "Cancelled";
        await _rentals.UpdateAsync(request);

        await _statusLogs.CreateAsync(new RentalStatusLog
        {
            RentalRequestId = request.Id,
            FromStatus = fromStatus,
            ToStatus = "Cancelled",
            ChangedByUserId = userId
        });

        return ServiceResult<object>.Ok(new { message = "Rental request cancelled successfully.", request_id = id });
    }
}

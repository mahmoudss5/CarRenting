using BackEnd.Common;
using BackEnd.DTOs.Car;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class CarPostService : ICarPostService
{
    private readonly ICarPostRepository _carPosts;
    private readonly ICarOwnerRepository _carOwners;
    private readonly IReviewRepository _reviews;
    private readonly IAdminActionRepository _adminActions;
    private readonly INotificationService _notifications;

    public CarPostService(ICarPostRepository carPosts, ICarOwnerRepository carOwners,
        IReviewRepository reviews, IAdminActionRepository adminActions,
        INotificationService notifications)
    {
        _carPosts = carPosts;
        _carOwners = carOwners;
        _reviews = reviews;
        _adminActions = adminActions;
        _notifications = notifications;
    }

    public async Task<ServiceResult<object>> GetActiveListingsAsync(int page, int pageSize)
    {
        var cars = await _carPosts.GetActiveListingsAsync(page, pageSize);
        var total = await _carPosts.CountActiveListingsAsync();

        var items = new List<CarListItemDto>();
        foreach (var c in cars)
        {
            var rating = await _reviews.GetAverageRatingAsync(c.Id);
            items.Add(MapToListItem(c, rating));
        }

        return ServiceResult<object>.Ok(new { cars = items, total, page });
    }

    public async Task<ServiceResult<CarDetailDto>> GetByIdAsync(long id)
    {
        var car = await _carPosts.GetByIdWithDetailsAsync(id);
        if (car is null) return ServiceResult<CarDetailDto>.NotFound("Car post not found.");

        return ServiceResult<CarDetailDto>.Ok(MapToDetail(car));
    }

    public async Task<ServiceResult<object>> SearchAsync(CarSearchQueryDto query)
    {
        var cars = await _carPosts.SearchAsync(query.Type, query.Brand, query.Location,
            query.MinPrice, query.MaxPrice, query.Page, query.PageSize);
        var total = await _carPosts.CountSearchAsync(query.Type, query.Brand, query.Location,
            query.MinPrice, query.MaxPrice);

        var items = new List<CarListItemDto>();
        foreach (var c in cars)
        {
            var rating = await _reviews.GetAverageRatingAsync(c.Id);
            items.Add(MapToListItem(c, rating));
        }

        return ServiceResult<object>.Ok(new { results = items, total });
    }

    public async Task<ServiceResult<CarPostCreatedDto>> CreateAsync(CreateCarPostRequestDto dto, long userId)
    {
        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null) return ServiceResult<CarPostCreatedDto>.Forbidden("Only Car Owners can create posts.");

        var car = new CarPost
        {
            OwnerId = owner.Id,
            Title = dto.Title,
            Description = dto.Description,
            CarType = dto.CarType,
            Brand = dto.Brand,
            Model = dto.Model,
            Year = dto.Year,
            Transmission = dto.Transmission,
            Location = dto.Location,
            PricePerDay = dto.RentalPrice,
            PostStatus = "PendingApproval",
            CarStatus = "Available"
        };

        car = await _carPosts.CreateAsync(car);

        return ServiceResult<CarPostCreatedDto>.Created(new CarPostCreatedDto
        {
            Message = "Car post created. Awaiting admin approval.",
            Post = new CarPostSummaryDto
            {
                PostId = car.Id,
                Title = car.Title,
                ApprovalStatus = MapApprovalStatus(car.PostStatus),
                RentalStatus = car.CarStatus,
                CreatedAt = car.CreatedAt
            }
        });
    }

    public async Task<ServiceResult<CarPostUpdatedDto>> UpdateAsync(long id, UpdateCarPostRequestDto dto, long userId)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ServiceResult<CarPostUpdatedDto>.NotFound("Car post not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || car.OwnerId != owner.Id)
            return ServiceResult<CarPostUpdatedDto>.Forbidden("You can only update your own posts.");

        if (dto.Title is not null) car.Title = dto.Title;
        if (dto.Description is not null) car.Description = dto.Description;
        if (dto.RentalPrice.HasValue) car.PricePerDay = dto.RentalPrice.Value;
        if (dto.Location is not null) car.Location = dto.Location;
        if (dto.Transmission is not null) car.Transmission = dto.Transmission;

        await _carPosts.UpdateAsync(car);

        return ServiceResult<CarPostUpdatedDto>.Ok(new CarPostUpdatedDto
        {
            Message = "Car post updated successfully.",
            Post = new CarPostUpdateResultDto
            {
                PostId = car.Id,
                Title = car.Title,
                RentalPrice = car.PricePerDay,
                Location = car.Location,
                UpdatedAt = car.UpdatedAt
            }
        });
    }

    public async Task<ServiceResult<object>> DeleteAsync(long id, long userId, string userRole)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ServiceResult<object>.NotFound("Car post not found.");

        if (userRole != "Admin")
        {
            var owner = await _carOwners.GetByUserIdAsync(userId);
            if (owner is null || car.OwnerId != owner.Id)
                return ServiceResult<object>.Forbidden("You can only delete your own posts.");
        }

        if (car.CarStatus == "Rented")
            return ServiceResult<object>.Forbidden("Cannot delete a car that is currently rented.");

        await _carPosts.DeleteAsync(car);
        return ServiceResult<object>.Ok(new { message = "Car post deleted successfully.", post_id = id });
    }

    public async Task<ServiceResult<IEnumerable<OwnerCarDto>>> GetOwnerCarsAsync(long userId)
    {
        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null) return ServiceResult<IEnumerable<OwnerCarDto>>.Forbidden("Only Car Owners can access this.");

        var cars = await _carPosts.GetByOwnerIdAsync(owner.Id);
        var result = cars.Select(c => new OwnerCarDto
        {
            PostId = c.Id,
            Title = c.Title,
            ApprovalStatus = MapApprovalStatus(c.PostStatus),
            RentalStatus = c.CarStatus,
            RentalPrice = c.PricePerDay,
            CreatedAt = c.CreatedAt
        });

        return ServiceResult<IEnumerable<OwnerCarDto>>.Ok(result);
    }

    public async Task<ServiceResult<object>> GetPendingCarsAsync()
    {
        var cars = await _carPosts.GetPendingAsync();
        var items = cars.Select(c => new PendingCarDto
        {
            PostId = c.Id,
            OwnerName = $"{c.Owner.User.FirstName} {c.Owner.User.LastName}".Trim(),
            Title = c.Title,
            CarType = c.CarType,
            Brand = c.Brand,
            Location = c.Location,
            RentalPrice = c.PricePerDay,
            CreatedAt = c.CreatedAt
        }).ToList();

        return ServiceResult<object>.Ok(new { pending_cars = items, total = items.Count });
    }

    public async Task<ServiceResult<AdminCarActionResponseDto>> ApproveCarAsync(long id, long adminId)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ServiceResult<AdminCarActionResponseDto>.NotFound("Car post not found.");

        car.PostStatus = "Active";
        await _carPosts.UpdateAsync(car);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "CarPost",
            EntityId = id,
            Action = "Approve"
        });

        await _notifications.CreateAsync(car.Owner.UserId, "PostApproved",
            $"Your car post '{car.Title}' has been approved and is now listed.",
            referenceId: car.Id, referenceType: "CarPost");

        return ServiceResult<AdminCarActionResponseDto>.Ok(new AdminCarActionResponseDto
        {
            Message = "Car post approved and is now listed.",
            PostId = car.Id,
            ApprovalStatus = "Approved"
        });
    }

    public async Task<ServiceResult<AdminCarActionResponseDto>> RejectCarAsync(long id, string reason, long adminId)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ServiceResult<AdminCarActionResponseDto>.NotFound("Car post not found.");

        car.PostStatus = "Rejected";
        await _carPosts.UpdateAsync(car);

        await _adminActions.CreateAsync(new AdminAction
        {
            AdminId = adminId,
            EntityType = "CarPost",
            EntityId = id,
            Action = "Reject",
            Reason = reason
        });

        await _notifications.CreateAsync(car.Owner.UserId, "PostRejected",
            $"Your car post '{car.Title}' was rejected. Reason: {reason}",
            referenceId: car.Id, referenceType: "CarPost");

        return ServiceResult<AdminCarActionResponseDto>.Ok(new AdminCarActionResponseDto
        {
            Message = "Car post rejected.",
            PostId = car.Id,
            ApprovalStatus = "Rejected"
        });
    }

    private static string MapApprovalStatus(string postStatus) => postStatus switch
    {
        "PendingApproval" => "Pending",
        "Active" => "Approved",
        _ => postStatus
    };

    private static CarListItemDto MapToListItem(CarPost c, double rating) => new()
    {
        PostId = c.Id,
        Title = c.Title,
        CarType = c.CarType,
        Brand = c.Brand,
        Model = c.Model,
        Year = c.Year,
        Transmission = c.Transmission,
        Location = c.Location,
        RentalPrice = c.PricePerDay,
        RentalStatus = c.CarStatus,
        OwnerName = $"{c.Owner.User.FirstName} {c.Owner.User.LastName}".Trim(),
        AverageRating = Math.Round(rating, 1)
    };

    private static CarDetailDto MapToDetail(CarPost c) => new()
    {
        PostId = c.Id,
        OwnerName = $"{c.Owner.User.FirstName} {c.Owner.User.LastName}".Trim(),
        Title = c.Title,
        Description = c.Description,
        CarType = c.CarType,
        Brand = c.Brand,
        Model = c.Model,
        Year = c.Year,
        Transmission = c.Transmission,
        Location = c.Location,
        RentalPrice = c.PricePerDay,
        RentalStatus = c.CarStatus,
        ApprovalStatus = c.PostStatus switch { "PendingApproval" => "Pending", "Active" => "Approved", _ => c.PostStatus },
        Availability = c.AvailabilityCalendars
            .Where(a => a.IsAvailable)
            .Select(a => a.CalendarDate)
            .OrderBy(d => d)
            .ToList(),
        Reviews = c.Reviews.Select(r => new CarReviewItemDto
        {
            RenterName = $"{r.Reviewer.FirstName} {r.Reviewer.LastName}".Trim(),
            Rating = r.Rating,
            Feedback = r.Comment,
            CreatedAt = r.CreatedAt
        }).ToList(),
        CreatedAt = c.CreatedAt
    };
}

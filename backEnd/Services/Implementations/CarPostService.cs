using BackEnd.Common;
using BackEnd.DTOs.Car;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BackEnd.Services.Implementations;

public class CarPostService : ICarPostService
{
    private readonly ICarPostRepository _carPosts;
    private readonly ICarOwnerRepository _carOwners;
    private readonly IReviewRepository _reviews;
    private readonly IAdminActionRepository _adminActions;
    private readonly INotificationService _notifications;
    private readonly ICarImageRepository _carImages;
    private readonly IFileStorageService _fileStorage;

    public CarPostService(ICarPostRepository carPosts, ICarOwnerRepository carOwners,
        IReviewRepository reviews, IAdminActionRepository adminActions,
        INotificationService notifications, ICarImageRepository carImages,
        IFileStorageService fileStorage)
    {
        _carPosts = carPosts;
        _carOwners = carOwners;
        _reviews = reviews;
        _adminActions = adminActions;
        _notifications = notifications;
        _carImages = carImages;
        _fileStorage = fileStorage;
    }

    public async Task<ResponResult<object>> GetActiveListingsAsync(int page, int pageSize)
    {
        var cars = await _carPosts.GetActiveListingsAsync(page, pageSize);
        var total = await _carPosts.CountActiveListingsAsync();
        var ratingsByCarId = await _reviews.GetAverageRatingsByCarPostIdsAsync(cars.Select(c => c.Id));

        var items = cars
            .Select(c => MapToListItem(c, ratingsByCarId.GetValueOrDefault(c.Id, 0)))
            .ToList();

        return ResponResult<object>.Ok(new { cars = items, total, page });
    }
    

    public async Task<ResponResult<CarDetailDto>> GetByIdAsync(long id)
    {
        var car = await _carPosts.GetByIdWithDetailsAsync(id);
        if (car is null) return ResponResult<CarDetailDto>.NotFound("Car post not found.");

        return ResponResult<CarDetailDto>.Ok(MapToDetail(car));
    }
    

    public async Task<ResponResult<object>> SearchAsync(CarSearchQueryDto query)
    {
        var cars = await _carPosts.SearchAsync(query.Type, query.Brand, query.Location,
            query.MinPrice, query.MaxPrice, query.Page, query.PageSize);
        var total = await _carPosts.CountSearchAsync(query.Type, query.Brand, query.Location,
            query.MinPrice, query.MaxPrice);
        var ratingsByCarId = await _reviews.GetAverageRatingsByCarPostIdsAsync(cars.Select(c => c.Id));

        var items = cars
            .Select(c => MapToListItem(c, ratingsByCarId.GetValueOrDefault(c.Id, 0)))
            .ToList();

        return ResponResult<object>.Ok(new { results = items, total });
    }

    public async Task<ResponResult<CarPostCreatedDto>> CreateAsync(CreateCarPostRequestDto dto, long userId)
    {
        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null) return ResponResult<CarPostCreatedDto>.Forbidden("Only Car Owners can create posts.");
        if (owner.User.AccountStatus != "Active")
            return ResponResult<CarPostCreatedDto>.Forbidden("Your owner account must be approved to create car posts.");

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
        return ResponResult<CarPostCreatedDto>.Created(new CarPostCreatedDto
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

    public async Task<ResponResult<CarPostUpdatedDto>> UpdateAsync(long id, UpdateCarPostRequestDto dto, long userId)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ResponResult<CarPostUpdatedDto>.NotFound("Car post not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || car.OwnerId != owner.Id)
            return ResponResult<CarPostUpdatedDto>.Forbidden("You can only update your own posts.");
        if (owner.User.AccountStatus != "Active")
            return ResponResult<CarPostUpdatedDto>.Forbidden("Your owner account must be approved to update car posts.");

        if (dto.Title is not null) car.Title = dto.Title;
        if (dto.Description is not null) car.Description = dto.Description;
        if (dto.RentalPrice.HasValue) car.PricePerDay = dto.RentalPrice.Value;
        if (dto.Location is not null) car.Location = dto.Location;
        if (dto.Transmission is not null) car.Transmission = dto.Transmission;

        await _carPosts.UpdateAsync(car);

        return ResponResult<CarPostUpdatedDto>.Ok(new CarPostUpdatedDto
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

    public async Task<ResponResult<object>> DeleteAsync(long id, long userId, string userRole)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ResponResult<object>.NotFound("Car post not found.");

        if (userRole != "Admin")
        {
            var owner = await _carOwners.GetByUserIdAsync(userId);
            if (owner is null || car.OwnerId != owner.Id)
                return ResponResult<object>.Forbidden("You can only delete your own posts.");
            if (owner.User.AccountStatus != "Active")
                return ResponResult<object>.Forbidden("Your owner account must be approved to delete car posts.");
        }

        if (car.CarStatus == "Rented")
            return ResponResult<object>.Forbidden("Cannot delete a car that is currently rented.");

        await _carPosts.DeleteAsync(car);
        return ResponResult<object>.Ok(new { message = "Car post deleted successfully.", post_id = id });
    }

    public async Task<ResponResult<IEnumerable<OwnerCarDto>>> GetOwnerCarsAsync(long userId)
    {
        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null) return ResponResult<IEnumerable<OwnerCarDto>>.Forbidden("Only Car Owners can access this.");
        if (owner.User.AccountStatus != "Active")
            return ResponResult<IEnumerable<OwnerCarDto>>.Forbidden("Your owner account must be approved to access owner cars.");

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

        return ResponResult<IEnumerable<OwnerCarDto>>.Ok(result);
    }

    public async Task<ResponResult<object>> GetPendingCarsAsync()
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

        return ResponResult<object>.Ok(new { pending_cars = items, total = items.Count });
    }

    public async Task<ResponResult<object>> GetAllCarsAdminAsync()
    {
        var cars = await _carPosts.GetAllForAdminAsync();
        var items = cars.Select(c => new
        {
            post_id = c.Id,
            owner_name = $"{c.Owner.User.FirstName} {c.Owner.User.LastName}".Trim(),
            title = c.Title,
            car_type = c.CarType,
            brand = c.Brand,
            location = c.Location,
            rental_price = c.PricePerDay,
            approval_status = MapApprovalStatus(c.PostStatus),
            rental_status = c.CarStatus,
            created_at = c.CreatedAt
        }).ToList();

        return ResponResult<object>.Ok(new { cars = items, total = items.Count });
    }

    public async Task<ResponResult<AdminCarActionResponseDto>> ApproveCarAsync(long id, long adminId)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ResponResult<AdminCarActionResponseDto>.NotFound("Car post not found.");

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

        return ResponResult<AdminCarActionResponseDto>.Ok(new AdminCarActionResponseDto
        {
            Message = "Car post approved and is now listed.",
            PostId = car.Id,
            ApprovalStatus = "Approved"
        });
    }

    public async Task<ResponResult<AdminCarActionResponseDto>> RejectCarAsync(long id, string reason, long adminId)
    {
        var car = await _carPosts.GetByIdAsync(id);
        if (car is null) return ResponResult<AdminCarActionResponseDto>.NotFound("Car post not found.");

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

        return ResponResult<AdminCarActionResponseDto>.Ok(new AdminCarActionResponseDto
        {
            Message = "Car post rejected.",
            PostId = car.Id,
            ApprovalStatus = "Rejected"
        });
    }

    public async Task<ResponResult<CarImageDto>> AddCarImageAsync(long carPostId, IFormFile image, bool isPrimary, long userId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ResponResult<CarImageDto>.NotFound("Car post not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || car.OwnerId != owner.Id)
            return ResponResult<CarImageDto>.Forbidden("You can only add images to your own posts.");

        var existingImages = await _carImages.GetByCarPostIdAsync(carPostId);
        var imageList = existingImages.ToList();

        if (isPrimary)
        {
            foreach (var img in imageList)
            {
                img.IsPrimary = false;
                await _carImages.CreateAsync(img);
            }
        }

        string imageUrl;
        try
        {
            imageUrl = await _fileStorage.SaveAsync(image, $"cars/{carPostId}");
        }
        catch (ArgumentException ex)
        {
            return ResponResult<CarImageDto>.Fail(ex.Message);
        }

        var carImage = await _carImages.CreateAsync(new CarImage
        {
            CarPostId = carPostId,
            ImageUrl  = imageUrl,
            IsPrimary = isPrimary || imageList.Count == 0,
            SortOrder = (byte)imageList.Count
        });

        return ResponResult<CarImageDto>.Created(new CarImageDto
        {
            ImageId   = carImage.Id,
            ImageUrl  = carImage.ImageUrl,
            IsPrimary = carImage.IsPrimary,
            SortOrder = carImage.SortOrder
        });
    }

    public async Task<ResponResult<object>> DeleteCarImageAsync(long carPostId, long imageId, long userId)
    {
        var car = await _carPosts.GetByIdAsync(carPostId);
        if (car is null) return ResponResult<object>.NotFound("Car post not found.");

        var owner = await _carOwners.GetByUserIdAsync(userId);
        if (owner is null || car.OwnerId != owner.Id)
            return ResponResult<object>.Forbidden("You can only delete images from your own posts.");

        var image = await _carImages.GetByIdAsync(imageId);
        if (image is null || image.CarPostId != carPostId)
            return ResponResult<object>.NotFound("Image not found.");

        _fileStorage.Delete(image.ImageUrl);
        await _carImages.DeleteAsync(image);

        return ResponResult<object>.Ok(new { message = "Image deleted successfully.", image_id = imageId });
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

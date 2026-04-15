using BackEnd.Common;
using BackEnd.DTOs.Rental;

namespace BackEnd.Services.Interfaces;

public interface IRentalService
{
    Task<ResponResult<RentalCreatedResponseDto>> CreateAsync(CreateRentalRequestDto dto, long userId);
    Task<ResponResult<IEnumerable<RentalListItemDto>>> GetMyRentalsAsync(long userId);
    Task<ResponResult<RentalDetailDto>> GetByIdAsync(long id, long userId, string userRole);
    Task<ResponResult<IEnumerable<OwnerRentalDto>>> GetOwnerRentalsAsync(long userId);
    Task<ResponResult<RentalActionResponseDto>> AcceptRentalAsync(long id, long userId);
    Task<ResponResult<RentalActionResponseDto>> RejectRentalAsync(long id, string reason, long userId);
    Task<ResponResult<RentalActionResponseDto>> CompleteRentalAsync(long id, long userId, string userRole);
    Task<ResponResult<object>> CancelRentalAsync(long id, long userId);
    Task<ResponResult<IEnumerable<AdminRentalDto>>> GetAllRentalsAsync();
}

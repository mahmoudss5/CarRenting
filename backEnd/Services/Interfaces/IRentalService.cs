using BackEnd.Common;
using BackEnd.DTOs.Rental;

namespace BackEnd.Services.Interfaces;

public interface IRentalService
{
    Task<ServiceResult<RentalCreatedResponseDto>> CreateAsync(CreateRentalRequestDto dto, long userId);
    Task<ServiceResult<IEnumerable<RentalListItemDto>>> GetMyRentalsAsync(long userId);
    Task<ServiceResult<RentalDetailDto>> GetByIdAsync(long id, long userId, string userRole);
    Task<ServiceResult<IEnumerable<OwnerRentalDto>>> GetOwnerRentalsAsync(long userId);
    Task<ServiceResult<RentalActionResponseDto>> AcceptRentalAsync(long id, long userId);
    Task<ServiceResult<RentalActionResponseDto>> RejectRentalAsync(long id, string reason, long userId);
    Task<ServiceResult<RentalActionResponseDto>> CompleteRentalAsync(long id, long userId, string userRole);
    Task<ServiceResult<object>> CancelRentalAsync(long id, long userId);
}

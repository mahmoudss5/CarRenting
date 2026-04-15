using BackEnd.Common;

namespace BackEnd.Services.Interfaces;

public interface IAdminStatsService
{
    Task<ResponResult<object>> GetDashboardStatsAsync();
}

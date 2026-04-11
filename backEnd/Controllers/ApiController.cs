using BackEnd.Common;
using BackEnd.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
public abstract class ApiController : ControllerBase
{
    protected long CurrentUserId => User.GetUserId();
    protected string CurrentUserRole => User.GetRole();

    protected IActionResult FromResult<T>(ServiceResult<T> result)
    {
        if (result.Success)
            return StatusCode(result.StatusCode, result.Data);

        return StatusCode(result.StatusCode, new { error = result.Error });
    }
}

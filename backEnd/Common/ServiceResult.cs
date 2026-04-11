namespace BackEnd.Common;

public class ServiceResult<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
    public string? Error { get; init; }
    public int StatusCode { get; init; }

    public static ServiceResult<T> Ok(T data) =>
        new() { Success = true, Data = data, StatusCode = 200 };

    public static ServiceResult<T> Created(T data) =>
        new() { Success = true, Data = data, StatusCode = 201 };

    public static ServiceResult<T> Fail(string error, int statusCode = 400) =>
        new() { Success = false, Error = error, StatusCode = statusCode };

    public static ServiceResult<T> NotFound(string error = "Resource not found.") =>
        Fail(error, 404);

    public static ServiceResult<T> Forbidden(string error) =>
        Fail(error, 403);

    public static ServiceResult<T> Unauthorized(string error = "Unauthorized.") =>
        Fail(error, 401);
}

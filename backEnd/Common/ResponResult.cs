namespace BackEnd.Common;

public class ResponResult<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
    public string? Error { get; init; }
    public int StatusCode { get; init; }

    public static ResponResult<T> Ok(T data) =>
        new() { Success = true, Data = data, StatusCode = 200 };

    public static ResponResult<T> Created(T data) =>
        new() { Success = true, Data = data, StatusCode = 201 };

    public static ResponResult<T> Fail(string error, int statusCode = 400) =>
        new() { Success = false, Error = error, StatusCode = statusCode };

    public static ResponResult<T> NotFound(string error = "Resource not found.") =>
        Fail(error, 404);

    public static ResponResult<T> Forbidden(string error) =>
        Fail(error, 403);

    public static ResponResult<T> Unauthorized(string error = "Unauthorized.") =>
        Fail(error, 401);
}

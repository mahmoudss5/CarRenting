using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace BackEnd.Swagger;

/// <summary>
/// Adds the Bearer security lock icon to every endpoint that carries [Authorize].
/// </summary>
public class AuthOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var hasAuthorize =
            context.MethodInfo.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any()
            || (context.MethodInfo.DeclaringType?
                .GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any() ?? false);

        if (!hasAuthorize) return;

        operation.Security ??= [];

        operation.Security.Add(new OpenApiSecurityRequirement
        {
            // OpenAPI.NET v2 uses OpenApiSecuritySchemeReference instead of
            // the old OpenApiSecurityScheme { Reference = ... } pattern.
            { new OpenApiSecuritySchemeReference("Bearer", null), [] }
        });
    }
}

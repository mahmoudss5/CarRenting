namespace BackEnd.Services.Interfaces;

public interface IFileStorageService
{
    /// <summary>
    /// Saves a file to a sub-folder under wwwroot/uploads.
    /// Returns the relative URL path (e.g. "/uploads/licenses/42/front.jpg").
    /// </summary>
    Task<string> SaveAsync(IFormFile file, string subFolder);

    /// <summary>Deletes a file given its relative URL path.</summary>
    void Delete(string? relativeUrl);
}

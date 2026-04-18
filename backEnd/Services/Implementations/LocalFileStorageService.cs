using BackEnd.Services.Interfaces;

namespace BackEnd.Services.Implementations;

public class LocalFileStorageService : IFileStorageService
{
    
    private readonly ILogger<LocalFileStorageService> _logger;
    private static readonly HashSet<string> AllowedExtensions =
        new(StringComparer.OrdinalIgnoreCase) { ".jpg", ".jpeg", ".png", ".webp" };

    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    private readonly string _uploadsRoot;

    public LocalFileStorageService(IWebHostEnvironment env,ILogger<LocalFileStorageService> logger)
    {
        // Saves under  <ContentRoot>/wwwroot/uploads/
         _logger = logger;
        _uploadsRoot = Path.Combine(env.WebRootPath, "uploads");
    }

    public async Task<string> SaveAsync(IFormFile file, string subFolder)
    {
        _logger.LogInformation("Saving file to local storage.");
        if (file is null || file.Length == 0)
            throw new ArgumentException("File is empty.");

        if (file.Length > MaxFileSizeBytes)
            throw new ArgumentException($"File exceeds the maximum allowed size of 5 MB.");

        var ext = Path.GetExtension(file.FileName);
        if (!AllowedExtensions.Contains(ext))
            throw new ArgumentException($"File type '{ext}' is not allowed. Use JPG, PNG or WEBP.");

        var folder = Path.Combine(_uploadsRoot, subFolder);
        Directory.CreateDirectory(folder);

        var fileName = $"{Guid.NewGuid()}{ext}";
        var fullPath = Path.Combine(folder, fileName);

        await using var stream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(stream);

        _logger.LogInformation("File saved successfully.");
        // Return a URL-style relative path
        return $"/uploads/{subFolder}/{fileName}".Replace("\\", "/");
    }

    public void Delete(string? relativeUrl)
    {
        if (string.IsNullOrWhiteSpace(relativeUrl)) return;

        // "/uploads/licenses/42/abc.jpg"  →  wwwroot/uploads/licenses/42/abc.jpg
        var relativePath = relativeUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
        var fullPath = Path.Combine(
            Directory.GetParent(_uploadsRoot)!.FullName, // wwwroot
            relativePath);

        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }
}

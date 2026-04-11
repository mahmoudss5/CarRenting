namespace BackEnd.DTOs.Car;

public class CarSearchQueryDto
{
    public string? Type { get; set; }
    public string? Brand { get; set; }
    public string? Location { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}

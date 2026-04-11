using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models;

public class AvailabilityCalendar
{
    public long Id { get; set; }
    public long CarPostId { get; set; }

    [Column("Date")]
    public DateOnly CalendarDate { get; set; }

    public bool IsAvailable { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public CarPost CarPost { get; set; } = null!;
}

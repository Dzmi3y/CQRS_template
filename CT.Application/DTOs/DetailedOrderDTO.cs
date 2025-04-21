namespace CT.Application.DTOs;

public class DetailedOrderDTO
{
    public Guid Id { get; set; }
    public List<DetailedOrderItemDTO> OrderItems { get; set; }
    public string Address { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
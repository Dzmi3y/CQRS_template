namespace CT.Application.DTOs;

public class CreateOrderResultDTO
{
    public Guid OrderId { get; set; }
    public string? Error { get; set; }
}
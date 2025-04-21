namespace CT.Application.DTOs;

public class DetailedOrderItemDTO
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
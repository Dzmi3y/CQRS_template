using CT.Application.DTOs;

namespace CT.API.Contracts.Requests;

public class CreateOrderRequest
{
    public List<ShortOrderItemDTO>? OrderList { get; set; }
}
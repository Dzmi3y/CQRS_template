using CT.Application.DTOs;
using MediatR;

namespace CT.Application.Orders.Commands;
public record CreateOrderCommand(string userId, List<ShortOrderItemDTO> orderList) : IRequest<CreateOrderResultDTO>;

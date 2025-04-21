using CT.Application.DTOs;
using MediatR;

namespace CT.Application.Orders.Queries;

public record GetOrdersQuery(string UserId) : IRequest<List<DetailedOrderDTO>>;
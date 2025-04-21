using CT.Application.DTOs;
using CT.Application.Interfaces;
using CT.Application.Orders.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CT.Application.Orders.Handlers;

public class GetOrdersHandler : IRequestHandler<GetOrdersQuery, List<DetailedOrderDTO>>
{
    private readonly IAppDbContext _appDbContext;

    public GetOrdersHandler(IAppDbContext appDbContext)
    {
        _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
    }

    public async Task<List<DetailedOrderDTO>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        var query = _appDbContext.Orders
            .AsNoTracking()
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .AsQueryable();

        if (!string.IsNullOrEmpty(request.UserId))
        {
            var userId = Guid.Parse(request.UserId);
            query = query.Where(o => o.UserId == userId);
        }

        query = query.OrderByDescending(o => o.CreatedDateUtc);

        var orders = await query.ToListAsync(cancellationToken);

        var result = orders.Select(order => new DetailedOrderDTO
        {
            Id = order.Id,
            Address = order.Address,
            PhoneNumber = order.PhoneNumber,
            Status = order.Status.ToString(),
            CreatedAt = order.CreatedDateUtc,
            OrderItems = order.OrderItems?.Select(item => new DetailedOrderItemDTO
            {
                ProductId = item.ProductId,
                ProductName = item.Product?.Name ?? "Unknown Product",
                Price = item.Product?.Price ?? 0,
                Quantity = item.Quantity
            }).ToList() ?? new List<DetailedOrderItemDTO>()
        }).ToList();

        return result;
    }
}
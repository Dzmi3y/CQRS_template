using CT.Application.DTOs;
using CT.Application.Interfaces;
using CT.Application.Orders.Commands;
using CT.Domain.Entities;
using CT.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CT.Application.Orders.Handlers;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, CreateOrderResultDTO>
{
    private readonly IAppDbContext _appDbContext;
    private readonly ILogger<CreateOrderHandler> _logger;

    public CreateOrderHandler(
        IAppDbContext appDbContext,
        ILogger<CreateOrderHandler> logger)
    {
        _appDbContext = appDbContext;
        _logger = logger;
    }

    public async Task<CreateOrderResultDTO> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var userId = ParseUserId(request.userId);
            var user = await GetUserAsync(userId, cancellationToken);
            if (user == null) return LogAndReturnError($"User with ID {request.userId} not found", "User not found");

            if (!IsValidOrder(request.orderList))
                return new CreateOrderResultDTO { Error = "Order must contain at least one item" };

            var products = await GetProductsAsync(request.orderList, cancellationToken);
            if (products == null) return new CreateOrderResultDTO { Error = "One or more products not found" };

            var order = CreateOrder(user, userId, request.orderList);
            return await SaveOrderAsync(order, cancellationToken, request.userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error creating order for user {request.userId}");
            return new CreateOrderResultDTO { Error = "An unexpected error occurred" };
        }
    }

    private Guid ParseUserId(string userId)
    {
        return Guid.Parse(userId);
    }

    private async Task<User?> GetUserAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await _appDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
    }

    private bool IsValidOrder(List<ShortOrderItemDTO>? orderList)
    {
        return orderList != null && orderList.Any();
    }

    private async Task<List<Product>> GetProductsAsync(List<ShortOrderItemDTO> orderList,
        CancellationToken cancellationToken)
    {
        var productIds = orderList.Select(item => item.ProductId).ToList();
        var products = await _appDbContext.Products
            .Where(p => productIds.Contains(p.Id.ToString()))
            .ToListAsync(cancellationToken);

        return products.Count == productIds.Count ? products : null;
    }

    private Order CreateOrder(User user, Guid userId, List<ShortOrderItemDTO> orderList)
    {
        var orderId = Guid.NewGuid();
        var orderItems = orderList.Select(item => new OrderItem
        {
            Id = Guid.NewGuid(),
            OrderId = orderId,
            ProductId = Guid.Parse(item.ProductId),
            Quantity = item.Quantity
        }).ToList();

        return new Order
        {
            Id = orderId,
            Status = OrderStatus.Pending,
            Address = user.DefaultAddress ?? string.Empty,
            PhoneNumber = user.DefaultPhoneNumber ?? string.Empty,
            UserId = userId,
            OrderItems = orderItems
        };
    }

    private async Task<CreateOrderResultDTO> SaveOrderAsync(Order order, CancellationToken cancellationToken,
        string userId)
    {
        await _appDbContext.Orders.AddAsync(order, cancellationToken);
        var result = await _appDbContext.SaveChangesAsync(cancellationToken);

        return result > 0
            ? new CreateOrderResultDTO { OrderId = order.Id }
            : LogAndReturnError($"Failed to save order for user {userId} to the database", "Failed to create order");
    }

    private CreateOrderResultDTO LogAndReturnError(string logMessage, string errorMessage)
    {
        _logger.LogWarning(logMessage);
        return new CreateOrderResultDTO { Error = errorMessage };
    }
}
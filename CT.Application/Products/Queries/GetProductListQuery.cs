using CT.Domain.Entities;
using MediatR;

namespace CT.Application.Products.Queries;

public record GetProductListQuery(int Count) : IRequest<List<Product>>;
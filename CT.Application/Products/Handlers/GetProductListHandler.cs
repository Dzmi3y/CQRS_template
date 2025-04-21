using CT.Application.Interfaces;
using CT.Application.Products.Queries;
using CT.Domain.Entities;
using CT.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CT.Application.Products.Handlers;

public class GetProductListHandler : IRequestHandler<GetProductListQuery, List<Product>>
{
    private readonly IAppDbContext _appDbContext;

    public GetProductListHandler(IAppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<List<Product>> Handle(GetProductListQuery request, CancellationToken cancellationToken)
    {
        var result = _appDbContext.Products
            .AsNoTracking()
            .Take(request.Count);

        if (request.IsSet != null)
        {
            var type = (bool)request.IsSet ? ProductType.Set : ProductType.Individually;
            return await result.Where(x => x.Type == type)
                .ToListAsync(cancellationToken);
        }

        return await result.ToListAsync(cancellationToken);
    }
}
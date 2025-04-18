﻿using CT.Application.Interfaces;
using CT.Application.Products.Queries;
using CT.Domain.Entities;
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
        return await _appDbContext.Products
            .AsNoTracking()
            .Take(request.Count)
            .ToListAsync(cancellationToken);
    }
}
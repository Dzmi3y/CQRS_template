using CT.Application.Interfaces;
using CT.Application.Users.Queries;
using CT.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CT.Application.Users.Handlers;

public class GetUserByEmailHandler : IRequestHandler<GetUserByEmailQuery, User?>
{
    private readonly IAppDbContext _appDbContext;

    public GetUserByEmailHandler(IAppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<User?> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
    {
        return await _appDbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == request.Email,
                cancellationToken);
    }
}
using CT.Application.DTOs;
using CT.Application.Interfaces;
using CT.Application.Interfaces.Services;
using CT.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CT.Infrastructure.Identity.Services;

public class RefreshTokenService : IRefreshTokenService
{
    private readonly IAppDbContext _appDbContext;

    public RefreshTokenService(IAppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<User?> GetUserByRefreshTokenAsync(Guid refreshToken)
    {
        return (await _appDbContext.RefreshTokens.Include(x => x.User).AsNoTracking()
            .SingleOrDefaultAsync(rt => rt.Token == refreshToken))?.User;
    }

    public async Task<RefreshTokenInfoDTO> GetRefreshTokenInfoAsync(Guid token)
    {
        var refreshToken = await _appDbContext.RefreshTokens
            .AsNoTracking()
            .SingleOrDefaultAsync(t => t.Token == token);
        if (refreshToken == null) return null;
        return new RefreshTokenInfoDTO
        {
            Token = refreshToken.Token,
            UserId = refreshToken.UserId,
            JwtId = refreshToken.JwtId,
            ExpiryDateUtc = refreshToken.ExpiryDateUtc,
            Invalidated = refreshToken.Invalidated,
            Used = refreshToken.Used
        };
    }

    public async Task SetAsUsedAsync(Guid token)
    {
        var refreshToken = await _appDbContext.RefreshTokens
            .AsNoTracking()
            .SingleOrDefaultAsync(t => t.Token == token);
        refreshToken.Used = true;
        _appDbContext.RefreshTokens.Update(refreshToken);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task SetAsInvalidatedAsync(Guid token)
    {
        var refreshToken = await _appDbContext.RefreshTokens
            .AsNoTracking()
            .SingleOrDefaultAsync(t => t.Token == token);
        refreshToken.Invalidated = true;
        _appDbContext.RefreshTokens.Update(refreshToken);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task<Guid> CreateRefreshTokenAsync(RefreshTokenInfoDTO tokenInfo)
    {
        var refreshToken = new RefreshToken
        {
            UserId = tokenInfo.UserId,
            JwtId = tokenInfo.JwtId,
            ExpiryDateUtc = tokenInfo.ExpiryDateUtc
        };
        await _appDbContext.RefreshTokens.AddAsync(refreshToken);
        await _appDbContext.SaveChangesAsync();
        return refreshToken.Token;
    }
}
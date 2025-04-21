using CT.Application.Interfaces;
using CT.Application.Users.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CT.Application.Users.Handlers;

public class InvalidateRefreshTokenHandler : IRequestHandler<InvalidateRefreshTokenCommand, bool>
{
    private readonly IAppDbContext _appDbContext;
    private readonly ILogger<InvalidateRefreshTokenHandler> _logger;

    public InvalidateRefreshTokenHandler(
        IAppDbContext appDbContext,
        ILogger<InvalidateRefreshTokenHandler> logger)
    {
        _appDbContext = appDbContext;
        _logger = logger;
    }

    public async Task<bool> Handle(InvalidateRefreshTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var refreshTokens = await _appDbContext.RefreshTokens
                .Where(rt => rt.JwtId == request.JwtId && !rt.Invalidated && !rt.IsDeleted)
                .ToListAsync(cancellationToken);

            if (!refreshTokens.Any())
            {
                _logger.LogWarning($"No valid refresh tokens found for JWT ID: {request.JwtId}");
                return false;
            }

            foreach (var token in refreshTokens) token.Invalidated = true;

            var saveResult = await _appDbContext.SaveChangesAsync(cancellationToken);

            return saveResult > 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error invalidating refresh token for JWT ID: {request.JwtId}");
            return false;
        }
    }
}
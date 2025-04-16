using CT.Application.DTOs;
using CT.Domain.Entities;

namespace CT.Application.Interfaces.Services;

public interface IRefreshTokenService
{
    Task<User?> GetUserByRefreshTokenAsync(Guid refreshToken);
    Task<RefreshTokenInfoDTO> GetRefreshTokenInfoAsync(Guid token);
    Task SetAsUsedAsync(Guid token);
    Task SetAsInvalidatedAsync(Guid token);
    Task<Guid> CreateRefreshTokenAsync(RefreshTokenInfoDTO tokenInfo);
}
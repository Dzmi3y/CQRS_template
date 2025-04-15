using CT.Domain.Entities;
using CT.Infrastructure.Application.DTOs;

namespace CT.Application.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationResultDTO> GenerateAuthenticationResultAsync(User user);
        Task<AuthenticationResultDTO> GenerateRefreshTokenAsync(Guid refreshToken);
    }
}

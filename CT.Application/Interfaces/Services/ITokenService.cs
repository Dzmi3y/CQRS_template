using CT.Application.DTOs;
using CT.Domain.Entities;

namespace CT.Application.Interfaces.Services;

public interface ITokenService
{
    Task<AuthenticationResultDTO> GenerateAuthenticationResultAsync(User user);
    Task<AuthenticationResultDTO> RefreshTokenAsync(Guid refreshToken);
}
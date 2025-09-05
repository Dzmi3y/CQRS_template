using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CT.Application.DTOs;
using CT.Application.Enums;
using CT.Application.Interfaces.Services;
using CT.Domain.Entities;
using CT.Infrastructure.Identity.Config;
using Microsoft.IdentityModel.Tokens;

namespace CT.Infrastructure.Identity.Services;

public class TokenService : ITokenService
{
    private readonly JwtSettings _jwtSettings;
    private readonly IRefreshTokenService _refreshTokenService;

    public TokenService(JwtSettings jwtSettings, IRefreshTokenService refreshTokenService)
    {
        _jwtSettings = jwtSettings;
        _refreshTokenService = refreshTokenService;
    }

    public async Task<AuthenticationResultDTO> GenerateAuthenticationResultAsync(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);
        var now = DateTime.UtcNow;

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }),
            Expires = now.Add(_jwtSettings.AccessTokenLifetime),
            NotBefore = now,
            IssuedAt = now,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };


        tokenDescriptor.Subject.AddClaim(new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()));
        tokenDescriptor.Subject.AddClaim(new Claim(JwtRegisteredClaimNames.Name, user.Name));
        tokenDescriptor.Subject.AddClaim(new Claim(JwtRegisteredClaimNames.Email, user.Email));
        tokenDescriptor.Subject.AddClaim(new Claim(JwtRegisteredClaimNames.Address, user.DefaultAddress));
        tokenDescriptor.Subject.AddClaim(new Claim(JwtRegisteredClaimNames.PhoneNumber, user.DefaultPhoneNumber));

        var accessToken = tokenHandler.CreateToken(tokenDescriptor);
        var refreshToken = await _refreshTokenService.CreateRefreshTokenAsync(new RefreshTokenInfoDTO
        {
            UserId = user.Id,
            JwtId = accessToken.Id,
            ExpiryDateUtc = DateTime.UtcNow.Add(_jwtSettings.RefreshTokenLifetime)
        });

        return new AuthenticationResultDTO
        {
            AccessToken = tokenHandler.WriteToken(accessToken),
            ExpiresIn = (int)_jwtSettings.AccessTokenLifetime.TotalSeconds,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthenticationResultDTO> RefreshTokenAsync(Guid refreshToken)
    {
        var storedRefreshToken = await _refreshTokenService.GetRefreshTokenInfoAsync(refreshToken);

        if (storedRefreshToken == null)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.RefreshTokenNotExists };

        if (DateTime.UtcNow > storedRefreshToken.ExpiryDateUtc)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.RefreshTokenExpired };

        if (storedRefreshToken.Invalidated)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.RefreshTokenInvalidated };

        if (storedRefreshToken.Used)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.RefreshTokenUsed };

        var user = await _refreshTokenService.GetUserByRefreshTokenAsync(refreshToken);
        if (user == null)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.NoAssociatedUser };

        await _refreshTokenService.SetAsUsedAsync(storedRefreshToken.Token);
        return await GenerateAuthenticationResultAsync(user);
    }
}
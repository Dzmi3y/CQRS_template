using CT.Application.DTOs;
using CT.Application.Enums;
using CT.Application.Interfaces.Services;
using CT.Application.Users.Commands;
using CT.Application.Users.Queries;
using CT.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CT.Application.Users.Handlers;

public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, AuthenticationResultDTO>
{
    private readonly ITokenService _tokenService;

    public RefreshTokenHandler(ITokenService tokenService, IPasswordHasher<User> passwordHasher,
        IMediator mediator)
    {
        _tokenService = tokenService;
    }

    public async Task<AuthenticationResultDTO> Handle(RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        return await _tokenService.RefreshTokenAsync(request.refreshToken);
    }
}
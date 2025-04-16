using CT.Application.DTOs;
using CT.Application.Enums;
using CT.Application.Interfaces.Services;
using CT.Application.Users.Commands;
using CT.Application.Users.Queries;
using CT.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CT.Application.Users.Handlers;

public class AuthenticateUserHandler : IRequestHandler<AuthenticateUserCommand, AuthenticationResultDTO>
{
    private readonly IMediator _mediator;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly ITokenService _tokenService;

    public AuthenticateUserHandler(ITokenService tokenService, IPasswordHasher<User> passwordHasher,
        IMediator mediator)
    {
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
        _mediator = mediator;
    }

    public async Task<AuthenticationResultDTO> Handle(AuthenticateUserCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _mediator.Send(new GetUserByEmailQuery(request.Email), cancellationToken);

        if (user == null)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.NoAssociatedUser };

        var passwordVerifyResult = _passwordHasher.VerifyHashedPassword(null, user.PasswordHash, request.Password);
        if (passwordVerifyResult == PasswordVerificationResult.Failed)
            return new AuthenticationResultDTO { Error = IdentityErrorCode.PasswordIsWrong };

        return await _tokenService.GenerateAuthenticationResultAsync(user);
    }
}
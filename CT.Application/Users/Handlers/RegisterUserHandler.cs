using CT.Application.DTOs;
using CT.Application.Enums;
using CT.Application.Interfaces;
using CT.Application.Interfaces.Services;
using CT.Application.Users.Commands;
using CT.Application.Users.Queries;
using CT.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace CT.Application.Users.Handlers;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, RegistrationResultDTO>
{
    private readonly IAppDbContext _appDbContext;
    private readonly ILogger<RegisterUserHandler> _logger;
    private readonly IMediator _mediator;
    private readonly IPasswordHasher<User> _passwordHasher;

    public RegisterUserHandler(
        ITokenService tokenService,
        IPasswordHasher<User> passwordHasher,
        IMediator mediator,
        IAppDbContext appDbContext,
        ILogger<RegisterUserHandler> logger)
    {
        _passwordHasher = passwordHasher;
        _mediator = mediator;
        _appDbContext = appDbContext;
        _logger = logger;
    }

    public async Task<RegistrationResultDTO> Handle(RegisterUserCommand request,
        CancellationToken cancellationToken)
    {
        var existingUser = await _mediator.Send(new GetUserByEmailQuery(request.Email), cancellationToken);
        if (existingUser != null)
            return new RegistrationResultDTO { Error = RegistrationErrorCode.UserAlreadyExists };

        var userId = Guid.NewGuid();
        var user = new User
        {
            Id = userId,
            Email = request.Email,
            Name = request.Name,
            DefaultPhoneNumber = request.DefaultPhone,
            DefaultAddress = request.DefaultAddress
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await _appDbContext.Users.AddAsync(user, cancellationToken);
        var saved = await _appDbContext.SaveChangesAsync(cancellationToken);

        if (saved == 0)
        {
            _logger.LogError($"Failed to save user {user.Email} to the database");
            return new RegistrationResultDTO { Error = RegistrationErrorCode.DatabaseError };
        }

        return new RegistrationResultDTO { UserId = userId };
    }
}
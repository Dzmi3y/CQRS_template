using CT.Application.DTOs;
using MediatR;

namespace CT.Application.Users.Commands;

public record AuthenticateUserCommand(string Email, string Password) : IRequest<AuthenticationResultDTO>;
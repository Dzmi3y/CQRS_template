using CT.Application.DTOs;
using MediatR;

namespace CT.Application.Users.Commands;

public record RefreshTokenCommand(Guid refreshToken) : IRequest<AuthenticationResultDTO>;
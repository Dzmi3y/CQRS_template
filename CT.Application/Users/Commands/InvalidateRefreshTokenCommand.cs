using MediatR;

namespace CT.Application.Users.Commands;

public record InvalidateRefreshTokenCommand(string JwtId) : IRequest<bool>;
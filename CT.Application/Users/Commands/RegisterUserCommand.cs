using CT.Application.DTOs;
using MediatR;

namespace CT.Application.Users.Commands;

public record RegisterUserCommand(
    string Email,
    string Password,
    string Name,
    string? DefaultPhone,
    string? DefaultAddress) : IRequest<RegistrationResultDTO>;
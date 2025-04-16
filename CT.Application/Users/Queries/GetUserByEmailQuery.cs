using CT.Domain.Entities;
using MediatR;

namespace CT.Application.Users.Queries;

public record GetUserByEmailQuery(string Email) : IRequest<User>;
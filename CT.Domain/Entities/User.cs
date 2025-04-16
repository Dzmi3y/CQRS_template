using System.ComponentModel.DataAnnotations;
using CT.Domain.Entities.Base;

namespace CT.Domain.Entities;

public class User : AuditableEntity
{
    [Key] public Guid Id { get; set; }

    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string DefaultAddress { get; set; } = string.Empty;
    public string DefaultPhoneNumber { get; set; } = string.Empty;

    public virtual ICollection<RefreshToken>? RefreshTokens { get; set; }
    public virtual ICollection<Order>? Orders { get; set; }
}
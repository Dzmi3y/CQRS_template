namespace CT.Infrastructure.Application.Enums
{
    public enum IdentityErrorCode
    {
        RefreshTokenNotExists,
        RefreshTokenExpired,
        RefreshTokenInvalidated,
        RefreshTokenUsed,
        NoAssociatedUser
    }
}

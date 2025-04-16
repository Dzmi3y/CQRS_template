namespace CT.Application.Enums;

public enum IdentityErrorCode
{
    RefreshTokenNotExists,
    RefreshTokenExpired,
    RefreshTokenInvalidated,
    RefreshTokenUsed,
    NoAssociatedUser,
    PasswordIsWrong
}
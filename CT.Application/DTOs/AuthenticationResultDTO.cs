using CT.Infrastructure.Application.Enums;

namespace CT.Infrastructure.Application.DTOs
{
    public class AuthenticationResultDTO
    {
        public string AccessToken { get; set; } = string.Empty;
        public Guid RefreshToken { get; set; }
        public int ExpiresIn { get; set; }
        public IdentityErrorCode? Error { get; set; }
    }
}

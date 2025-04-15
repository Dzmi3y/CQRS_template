namespace CT.Infrastructure.Identity.Config
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public TimeSpan AccessTokenLifetime { get; set; }
        public TimeSpan RefreshTokenLifetime { get; set; }
    }
}

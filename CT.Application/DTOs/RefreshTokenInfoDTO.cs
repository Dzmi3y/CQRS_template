﻿namespace CT.Application.DTOs;

public class RefreshTokenInfoDTO
{
    public Guid Token { get; set; }
    public Guid UserId { get; set; }
    public string JwtId { get; set; } = string.Empty;
    public DateTime ExpiryDateUtc { get; set; }
    public bool Used { get; set; }
    public bool Invalidated { get; set; }
}
namespace CT.API.Contracts.Requests;

public class SignUpRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Name { get; set; }
    public string? DefaultPhone { get; set; }
    public string? DefaultAddress { get; set; }
}
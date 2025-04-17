
using CT.Application.Enums;

namespace CT.Application.DTOs
{
    public class RegistrationResultDTO
    {
        public Guid UserId { get; set; }
        public RegistrationErrorCode? Error { get; set; }
    }
}

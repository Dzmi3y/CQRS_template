using CT.Domain.Entities.Base;
using CT.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace CT.Domain.Entities
{
    public class Order : AuditableEntity
    {
        [Key]
        public Guid Id { get; set; }

        public OrderStatus Status { get; set; }
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public virtual User? User { get; set; }

        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}

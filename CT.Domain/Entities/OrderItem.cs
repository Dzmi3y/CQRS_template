using CT.Domain.Entities.Base;
using System.ComponentModel.DataAnnotations;

namespace CT.Domain.Entities
{
    public class OrderItem : AuditableEntity
    {
        [Key]
        public Guid Id { get; set; }

        public int Quantity { get; set; }
        public Guid ProductId { get; set; }
        public virtual Product? Product { get; set; }
        public Guid OrderId { get; set; }
        public virtual Order? Order { get; set; }
    }
}

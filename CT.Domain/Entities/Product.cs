using CT.Domain.Entities.Base;
using CT.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace CT.Domain.Entities
{
    public class Product : AuditableEntity
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public ProductType Type { get; set; }
    }
}

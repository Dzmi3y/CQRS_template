using System.ComponentModel.DataAnnotations;

namespace CT.Domain.Entities
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }

        public required string Name { get; set; }
        public required string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }
}

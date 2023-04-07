using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public partial class TbAddress
    {
        [Key]
        public int IdAddress { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmState { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmCity { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmStreet { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmNeighborhood { get; set; }

        [Required]
        public int NrHouseNumber { get; set; }

        [MaxLength(50)]
        public string? NmComplement { get; set; }

        public int? NrZipCode { get; set; }

        public virtual ICollection<TbUser> TbUsers { get; set; } = new List<TbUser>();
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class MateriaDto
    {
        public int IdClass { get; set; }
        public int IdUser { get; set; }
        public string NmClass { get; set; }
        public string NmWeekday { get; set; }
        public string NmClassroom { get; set; }
        public int? NrTotal { get; set; }
        public string NmUser { get; set; }
        public TimeSpan DtTime { get; set; }
    }
    public partial class TbClass
    {
        [Key]
        public int IdClass { get; set; }

        [Required]
        public int IdUser { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmClass { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmWeekday { get; set; }

        [MaxLength(50)]
        public string? NmClassroom { get; set; }

        public int? NrTotal { get; set; }

        [MaxLength(50)]
        public string? NmUser { get; set; }

        [Required]
        public TimeSpan DtTime { get; set; }

        public virtual TbUser IdUserNavigation { get; set; }

        public virtual ICollection<TbUserClass> TbUserClasses { get; set; } = new List<TbUserClass>();
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class AcadActivityDto
    {
        public int IdAcadActivity { get; set; }
        public int IdUserClass { get; set; }
        public string NmAcadActivity { get; set; }
        public DateTime DtDeadline { get; set; }
    }
    public class TbAcadActivity
    {
        [Key]
        [Required]
        public int IdAcadActivity { get; set; }

        [Required]
        public int IdUserClass { get; set; }

        [Required]
        [MaxLength(100)]
        public string NmAcadActivity { get; set; }

        [Required]
        public DateTime DtDeadline { get; set; }

        [Required]
        public virtual TbUserClass IdUserClassNavigation { get; set; }
    }
}

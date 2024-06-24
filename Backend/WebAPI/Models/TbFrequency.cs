using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public partial class TbFrequency
    {
        [Key]
        public int IdFrequency { get; set; }

        [Required]
        public int IdUserClass { get; set; }

        [Required]
        public int NrPresence { get; set; }

        [Required]
        public DateTime DtDate { get; set; }

        public virtual TbUserClass IdUserClassNavigation { get; set; }
    }
}

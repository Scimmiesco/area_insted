using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public partial class TbClassFile
    {
        [Key]
        public int IdClassFiles { get; set; }

        [Required]
        public int IdClass { get; set; }

        [Required]
        [MaxLength(50)]
        public string NmFile { get; set; }

        [Required]
        public byte[] ImgFile { get; set; }

        public virtual TbClass IdClassNavigation { get; set; }
    }
}

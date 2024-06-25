using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public partial class TbGrade
    {
        [Key]
        [Required]
        public int IdGrades { get; set; }

        [Required]
        public int IdUserClass { get; set; }

        [Required]
        public decimal Prova1 { get; set; }

        [Required]
        public decimal Prova2 { get; set; }

        [Required]
        public decimal ExCp1 { get; set; }

        [Required]
        public decimal ExCp2 { get; set; }

        [Required]
        public decimal Portfolio { get; set; }

        [Required]
        public decimal Project { get; set; }

        public decimal? Exam { get; set; }

        [Required]
        public virtual TbUserClass IdUserClassNavigation { get; set; } = null!;
    }
}

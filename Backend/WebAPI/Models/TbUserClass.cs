using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models;
public class userclassDto
{
    public int IdClass { get; set; }
}
public partial class TbUserClass
{
    [Key]
    public int IdUserClass { get; set; }

    public int IdUser { get; set; }

    public int IdClass { get; set; }

    [ForeignKey("IdClass")]
    public virtual TbClass IdClassNavigation { get; set; } = null!;

    public virtual ICollection<TbAcadActivity> TbAcadActivities { get; set; } = new List<TbAcadActivity>();

    public virtual ICollection<TbFrequency> TbFrequencies { get; set; } = new List<TbFrequency>();

    public virtual ICollection<TbGrade> TbGrades { get; set; } = new List<TbGrade>();
}

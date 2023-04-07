using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models;

public partial class TbUser
{
    [Key]
    [Required]
    public int IdUser { get; set; }

    [Required]
    [ForeignKey("IdAddressNavigation")]
    public int IdAddress { get; set; }

    [Required]
    public string NmUser { get; set; }

    [MinLength(10)]
    public string NrRegister { get; set; }

    [Required]
    public string NrCpf { get; set; }

    public int? NrRg { get; set; }

    public string? NmExpedition { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime DtBirthdate { get; set; }

    public string NmSex { get; set; }

    [Required]
    public string NmPhone1 { get; set; }

    public string? NmPhone2 { get; set; }

    [EmailAddress]
    public string NmEmail { get; set; }

    [Required]
    public string NmPassword { get; set; }

    public byte[]? ImgFile { get; set; }

    [Required]
    public bool SnTeacher { get; set; }

    public virtual TbAddress? IdAddressNavigation { get; set; }

    public virtual ICollection<TbClass>? TbClasses { get; set; }
}

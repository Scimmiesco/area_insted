using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.models
{

    [Table("AtividadesMaterias")]
    public partial class AtividadesMaterias
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AtividadesMateriasID { get; set; }

        public int? UsuarioID { get; set; }

        [Required]
        public int MateriaID { get; set; }

        [Required]
        public int TipoAtividadeID { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        public DateTime? PrazoFinal { get; set; }

        [StringLength(2000)]
        public string? Conteudo { get; set; }

        [Required]
        [StringLength(1)]
        public string Situacao { get; set; }
    }
}
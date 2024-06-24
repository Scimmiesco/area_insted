using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.models;
using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    public class AtividadesController : ControllerBase
    {
        private readonly AreaInstedContext _context;
        private readonly string _uploadFolder;
        private readonly IMateriasService _materiasService;

        public AtividadesController(AreaInstedContext context, IMateriasService materiasService)
        {
            _materiasService = materiasService;
            _context = context;
            _uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        }

        [HttpGet("GetAtividadesPorMateria")]
        public async Task<IActionResult> GetAtividadesPorMateria(string materiaID, string usuarioID)
        {
            try
            {
                if (string.IsNullOrEmpty(materiaID))
                {
                    return BadRequest(new { message = "ID da matéria informado é inválido." });
                }

                if (!int.TryParse(materiaID, out int materiaIdInt))
                {
                    return BadRequest(new { message = "ID da matéria deve ser um número válido." });
                }

                var materia = await _context.TbClasses.FirstOrDefaultAsync(u => u.IdClass == materiaIdInt);

                if (materia == null)
                {
                    return NotFound(new { message = "Matéria não encontrada." });
                }

                if (string.IsNullOrEmpty(usuarioID))
                {
                    return BadRequest(new { message = "ID do usuário informado é inválido." });
                }

                if (!int.TryParse(usuarioID, out int usuarioIDInt))
                {
                    return BadRequest(new { message = "ID do usuário deve ser um número válido." });
                }

                var usuario = await _context.TbUsers.FirstOrDefaultAsync(u => u.IdUser == usuarioIDInt);

                if (usuario == null)
                {
                    return NotFound(new { message = "Usuário não encontrado." });
                }

                var atividades = await _context.AtividadesMaterias
                    .Where(u => u.MateriaID == materiaIdInt)
                    .ToListAsync();

                var materias = _materiasService.GetMaterias(usuarioIDInt);

                List<int> idClasses = materias.Select(m => m.IdClass).ToList();
                List<string> nmClasses = materias.Select(m => m.NmClass).ToList();

                List<dtoAtividadePorUsuario> dtoAtividades = atividades.Select(a => new dtoAtividadePorUsuario
                {
                    AtividadesMateriasID = a.AtividadesMateriasID,
                    UsuarioID = a.UsuarioID,
                    MateriaID = a.MateriaID,
                    TipoAtividadeID = a.TipoAtividadeID,
                    Nome = a.Nome,
                    PrazoInicial = a.PrazoInicial,
                    PrazoFinal = a.PrazoFinal,
                    Conteudo = a.Conteudo,
                    Situacao = a.Situacao,
                    CaminhoArquivo = a.CaminhoArquivo,
                    UsuarioInclusao = a.UsuarioInclusao,
                    DataInclusao = a.DataInclusao,
                    UsuarioAlteracao = a.UsuarioAlteracao,
                    DataAlteracao = a.DataAlteracao,
                    NmClass = nmClasses[idClasses.IndexOf(a.MateriaID)]
                }).ToList();

                return Ok(new
                {
                    success = true,
                    message = "Atividades retornadas com sucesso!",
                    atividades = dtoAtividades
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpGet("ObterAtividadesPorUsuario")]
        public async Task<IActionResult> ObterAtividadesPorUsuario(string usuarioID)
        {
            try
            {
                if (string.IsNullOrEmpty(usuarioID))
                {
                    return BadRequest(new { message = "ID do usuário informado é inválido." });
                }

                if (!int.TryParse(usuarioID, out int usuarioIDInt))
                {
                    return BadRequest(new { message = "ID do usuário deve ser um número válido." });
                }

                var usuario = await _context.TbUsers.FirstOrDefaultAsync(u => u.IdUser == usuarioIDInt);

                if (usuario == null)
                {
                    return NotFound(new { message = "Usuário não encontrado." });
                }

                var materias = _materiasService.GetMaterias(usuarioIDInt);
                List<int> idClasses = materias.Select(m => m.IdClass).ToList();
                List<string> nmClasses = materias.Select(m => m.NmClass).ToList();

                var atividades = await _context.AtividadesMaterias
                .Where(x => idClasses.Contains(x.MateriaID)).ToListAsync();

                List<dtoAtividadePorUsuario> dtoAtividades = atividades.Select(a => new dtoAtividadePorUsuario
                {
                    AtividadesMateriasID = a.AtividadesMateriasID,
                    UsuarioID = a.UsuarioID,
                    MateriaID = a.MateriaID,
                    TipoAtividadeID = a.TipoAtividadeID,
                    Nome = a.Nome,
                    PrazoInicial = a.PrazoInicial,
                    PrazoFinal = a.PrazoFinal,
                    Conteudo = a.Conteudo,
                    Situacao = a.Situacao,
                    CaminhoArquivo = a.CaminhoArquivo,
                    UsuarioInclusao = a.UsuarioInclusao,
                    DataInclusao = a.DataInclusao,
                    UsuarioAlteracao = a.UsuarioAlteracao,
                    DataAlteracao = a.DataAlteracao,
                    NmClass = nmClasses[idClasses.IndexOf(a.MateriaID)]
                }).ToList();

                return Ok(new
                {
                    success = true,
                    message = "Atividades retornadas com sucesso!",
                    atividades = dtoAtividades
                });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPost("CriarOuAdicionarAtividade")]
        public async Task<IActionResult> CriarOuAdicionarAtividade([FromBody] AtividadesMaterias atividadeNova)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (!atividadeNova.AtividadesMateriasID.Equals(0))
                {
                    var atividadeExistente = await _context.AtividadesMaterias.FindAsync(atividadeNova.AtividadesMateriasID);

                    if (atividadeExistente != null)
                    {
                        // Atualizar a atividade existente
                        atividadeExistente.Nome = atividadeNova.Nome;
                        atividadeExistente.TipoAtividadeID = atividadeNova.TipoAtividadeID;
                        atividadeExistente.Situacao = atividadeNova.Situacao;
                        atividadeExistente.PrazoInicial = atividadeNova.PrazoInicial;
                        atividadeExistente.PrazoFinal = atividadeNova.PrazoFinal;
                        atividadeExistente.Conteudo = atividadeNova.Conteudo;
                        atividadeExistente.UsuarioAlteracao = atividadeNova.UsuarioID.ToString();
                        atividadeExistente.DataAlteracao = DateTime.Now;

                        _context.AtividadesMaterias.Update(atividadeExistente);
                    }
                    else
                    {
                        return NotFound($"Atividade com ID {atividadeNova.AtividadesMateriasID} não encontrada.");
                    }

                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Atividade Atualizada com sucesso!" });
                }

                var atividade = new AtividadesMaterias
                {
                    UsuarioID = atividadeNova.UsuarioID,
                    MateriaID = atividadeNova.MateriaID,
                    TipoAtividadeID = atividadeNova.TipoAtividadeID,
                    Nome = atividadeNova.Nome,
                    PrazoFinal = atividadeNova.PrazoFinal,
                    Conteudo = atividadeNova.Conteudo,
                    Situacao = atividadeNova.Situacao,
                    PrazoInicial = atividadeNova.PrazoInicial,
                    CaminhoArquivo = atividadeNova.CaminhoArquivo,
                    UsuarioInclusao = atividadeNova.UsuarioInclusao,
                    DataInclusao = DateTime.Now,
                    UsuarioAlteracao = atividadeNova.UsuarioAlteracao,
                    DataAlteracao = atividadeNova.DataAlteracao
                };

                _context.AtividadesMaterias.Add(atividade);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Atividade adicionada com sucesso!" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("uploadArquivo")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var filePath = Path.Combine(_uploadFolder, file.FileName);

            // Create directory if it doesn't exist
            if (!Directory.Exists(_uploadFolder))
            {
                Directory.CreateDirectory(_uploadFolder);
            }

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { filePath }); ;
        }


    }
}

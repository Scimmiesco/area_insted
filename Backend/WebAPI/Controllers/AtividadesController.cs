using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.models;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AtividadesController : ControllerBase
    {
        AreaInstedContext _context;
        public AtividadesController(AreaInstedContext context)

        {
            _context = context;
        }

        [HttpGet("GetAtividadesPorMateria")]
        public async Task<IActionResult> GetAtividadesPorMateria(string materiaID)
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

                var atividades = await _context.AtividadesMaterias
                    .Where(u => u.MateriaID == materiaIdInt)
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    message = "Atividades retornadas com sucesso!",
                    atividades = atividades
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("AdicionarAtividade")]
        public async Task<IActionResult> AdicionarAtividade([FromBody] AtividadesMaterias atividadeNova)
        {
            try
            {
                // 1. Validate the provided activity data
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // 2. Create a new Atividade entity from the activity data
                var atividade = new AtividadesMaterias
                {
                    UsuarioID = atividadeNova.UsuarioID,
                    MateriaID = atividadeNova.MateriaID,
                    TipoAtividadeID = atividadeNova.TipoAtividadeID,
                    Nome = atividadeNova.Nome,
                    PrazoFinal = atividadeNova.PrazoFinal,
                    Conteudo = atividadeNova.Conteudo,
                    Situacao = atividadeNova.Situacao,
                    PrazoInicial = atividadeNova.PrazoInicial
                };

                // 3. Add the activity entity to the DbContext
                _context.AtividadesMaterias.Add(atividade);

                // 4. Save the changes using Entity Framework Core
                await _context.SaveChangesAsync();

                // 5. Return a successful response
                return Ok(new { message = "Atividade adicionada com sucesso!" });
            }
            catch (Exception ex)
            {
                // 6. Handle exceptions and return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


    }
}

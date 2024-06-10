using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

    }
}

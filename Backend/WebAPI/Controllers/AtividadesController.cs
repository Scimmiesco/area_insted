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

        [HttpGet("GetAtividades")]
        public async Task<IActionResult> GetAtividades(string ra)
        {
            try
            {
                if (ra.IsNullOrEmpty())
                {
                    return BadRequest(new { message = "RA informado está nulo ou vazio." });
                }

                var user = await _context.TbUsers.FirstOrDefaultAsync(u => u.NrRegister == ra);
                if (user == null)
                {
                    return NotFound(new { message = "Usuário não encontrado." });
                }

                var userId = user.IdUser;
                var IdsUserClass = await _context.TbUserClasses
                    .Where(u => u.IdUser == userId)
                    .Select(a => a.IdClass)
                    .ToListAsync();

                var atividades = await _context.TbAcadActivities
                    .Where(u => IdsUserClass.Contains(u.IdUserClass))
                    .Select(a => new AcadActivityDto
                    {
                        IdAcadActivity = a.IdAcadActivity,
                        IdUserClass = a.IdUserClass,
                        NmAcadActivity = a.NmAcadActivity,
                        DtDeadline = a.DtDeadline
                    })
                    .ToListAsync();


                return Ok(new
                {
                    success = true,
                    message = "Atividades retornadas com sucesso!",
                    atividade = atividades
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("materias")]
    public class MateriasController : ControllerBase

    {
        private AreaInstedContext _context;
        public MateriasController(AreaInstedContext context)

        {
            _context = context;
        }
        [HttpGet("getmaterias")]
        public async Task<IActionResult> GetMaterias(string ra)
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

                var materias = await _context.TbClasses
                    .Where(u => IdsUserClass.Contains(u.IdClass))
                    .Select(c => new MateriaDto
                    {
                        IdClass = c.IdClass,
                        IdUser = c.IdUser,
                        NmClass = c.NmClass,
                        NmWeekday = c.NmWeekday,
                        NmClassroom = c.NmClassroom,
                        NrTotal = c.NrTotal,
                        NmUser = c.NmUser,
                        DtTime = c.DtTime
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    message = "matérias retornadas com sucesso!",
                    materias = materias
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

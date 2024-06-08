using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("materias")]
    public class MateriasController : ControllerBase

    {
        private AreaInstedContext _context;
        private IConfiguration _configuration;
        private TokenService _tokenService;
        public MateriasController(AreaInstedContext context, IConfiguration configuration)

        {
            _context = context;
            _configuration = configuration;
            _tokenService = new TokenService(_configuration);

        }
        [HttpGet("getmaterias")]
        public IActionResult GetMaterias(int usuarioID)
        {
            try
            {
                if (usuarioID == 0)
                {
                    return BadRequest(new { message = "ID informado é inválido." });
                }

                var user = _context.TbUsers.FirstOrDefault(u => u.IdUser == usuarioID);

                if (user == null)
                {
                    return NotFound(new { message = "Usuário não encontrado." });
                }

                var userId = user.IdUser;
                var IdsUserClass = _context.TbUserClasses
                    .Where(u => u.IdUser == userId)
                    .Select(a => a.IdClass)
                    .ToList();

                var materias = _context.TbClasses
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
                    .ToList();

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

        [HttpGet("getmateriasdocente")]
        public IActionResult GetMateriasDocente([FromHeader(Name = "Authorization")] string token, [FromQuery] int usuarioID)
        {
            try
            {
                if (_tokenService.ValidateToken(token))
                {
                    if (usuarioID == 0)
                    {
                        return BadRequest(new { message = "ID informado é inválido." });
                    }

                    var tbUser = _context.TbUsers.FirstOrDefault(u => u.IdUser == usuarioID);

                    if (tbUser == null)
                    {
                        return NotFound(new { message = "Usuário não encontrado." });
                    }
                    if (tbUser.SnTeacher == true)
                    {

                        var userId = tbUser.IdUser;

                        var materias = _context.TbClasses
                            .Where(u => u.IdUser == tbUser.IdUser)
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
                            .ToList();

                        return Ok(new
                        {
                            success = true,
                            message = "matérias retornadas com sucesso!",
                            materias = materias
                        });
                    }
                    else return StatusCode(StatusCodes.Status401Unauthorized, "Usuário não possui permissão como docente.");
                }
                else return StatusCode(StatusCodes.Status401Unauthorized, "Token inválido.");
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

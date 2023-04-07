using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("user")]

   

    public class AreaInstedController : ControllerBase
    {

        private AreaInstedContext _context;
        public AreaInstedController(AreaInstedContext context)
        {
            _context = context;
        }

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] TbUser user)
        {
            try
            {
                await _context.TbUsers.AddAsync(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("get-users")]
        public IEnumerable<TbUser> GetUser([FromQuery] int skip = 0, [FromQuery] int take = 15)

        {
            return (IEnumerable<TbUser>)_context.TbUsers.Skip(skip).Take(take);
        }

        [HttpGet("get-users/{id}")]
        public IActionResult GetUserByID(int id)
        {
            var user = _context.TbUsers.FirstOrDefault(a => a.IdUser == id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("update-user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] TbUser user)
        {
            var userToUpdate = await _context.TbUsers.FirstOrDefaultAsync(u => u.IdUser == id);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            try
            {
                userToUpdate.NmUser = user.NmUser;
                userToUpdate.NmEmail = user.NmEmail;
                userToUpdate.NmPassword = user.NmPassword;
                userToUpdate.NrRegister = user.NrRegister;
                userToUpdate.NrCpf = user.NrCpf;

                _context.TbUsers.Update(userToUpdate);
                await _context.SaveChangesAsync();

                return Ok(userToUpdate);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet("recover-password/{col}/{recoverField}")]
        public async Task<IActionResult> RecoverPassword(string recoverField, string col)
        {
            var properties = new Dictionary<string, string>
            {
            { "ra", "NrRegister" },
            { "cpf", "NrCpf" },
            { "email", "NmEmail" }
        };

            if (!properties.TryGetValue(col, out string propertyName))
            {
                return BadRequest("Coluna inválida.");
            }

            var user = await _context.TbUsers.SingleOrDefaultAsync(u => EF.Property<string>(u, propertyName) == recoverField);

            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }
            return Ok(new { user.NmEmail });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromForm] string ra, [FromForm] string password)
        {
            try
            {
                var user = await _context.TbUsers.SingleOrDefaultAsync(u => u.NrRegister == ra && u.NmPassword == password);

                if (user == null)
                {
                    return Unauthorized(new { success = false, message = "RA ou senha inválidos." });
                }

                var userResponse = new
                {
                    id = user.IdUser,
                    nome = user.NmUser,
                    email = user.NmEmail
                };

                return Ok(new { success = true, data = userResponse });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Ocorreu um erro ao tentar autenticar o usuário." });
            }
        }


        [HttpDelete("delete-user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var userToDelete = await _context.TbUsers.FirstOrDefaultAsync(u => u.IdUser == id);

            if (userToDelete == null)
            {
                return NotFound();
            }

            try
            {
                _context.TbUsers.Remove(userToDelete);
                await _context.SaveChangesAsync();

                return Ok(userToDelete);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



    }

}

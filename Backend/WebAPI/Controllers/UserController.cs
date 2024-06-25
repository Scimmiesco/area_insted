using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.models.dtos;
using WebAPI.Data;
using WebAPI.Helpers.EmailBodies;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("user")]

    public class UserController : ControllerBase
    {
        public class novaSenhaModel
        {
            public string novaSenha { get; set; }
        }
        public class LoginModel
        {
            public string Login { get; set; }
            public string Password { get; set; }
        }

        private readonly IHttpContextAccessor _httpContextAccessor;
        private AreaInstedContext _context;
        private readonly IConfiguration _configuration;
        private readonly TokenService _tokenService;
        private readonly IEmailService _emailService;
        public UserController(AreaInstedContext context, IConfiguration configuration, IEmailService emailService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
            _tokenService = new TokenService(_configuration);
            _httpContextAccessor = httpContextAccessor;
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

        [HttpGet("get-user/{ra}")]
        public IActionResult GetUserByRA(string ra)
        {
            try
            {
                string token = Request.Headers["Authorization"];
                if (string.IsNullOrEmpty(token) && !_tokenService.ValidateToken(token))
                {
                    return Unauthorized();
                }
                var user = _context.TbUsers.FirstOrDefault(a => a.NrRegister == ra);

                if (user == null)
                {
                    return NotFound();
                }

                userDto userDto = new userDto(user);
                return Ok(new
                {
                    success = true,
                    message = "Usuário retornado com sucesso",
                    user = userDto
                });
            }
            catch (Exception ex)

            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
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

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Helpers.EmailBodies;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Services;
namespace WebAPI.Controllers
{

    [ApiController]
    [Route("senha")]
    public class PasswordController : ControllerBase
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private AreaInstedContext _context;
        private readonly IConfiguration _configuration;
        private readonly TokenService _tokenService;
        private readonly IEmailService _emailService;
        public PasswordController(AreaInstedContext context, IConfiguration configuration, IEmailService emailService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
            _tokenService = new TokenService(_configuration);
            _httpContextAccessor = httpContextAccessor;
        }
        public class novaSenhaModel
        {
            public string novaSenha { get; set; }
        }

        [HttpGet("emailresetsenha")]
        public async Task<IActionResult> RecuperaSenha([FromQuery] string tipo, [FromQuery] string param)
        {
            try
            {
                if (string.IsNullOrEmpty(tipo) || string.IsNullOrEmpty(param))
                {

                    return BadRequest("Tipo e parâmetro são obrigatórios.");
                }
                TbUser? tbUser = null;

                switch (tipo.ToLower())
                {
                    case "email":
                        tbUser = await _context.TbUsers.FirstOrDefaultAsync(u => u.NmEmail == param);
                        break;
                    case "ra":
                        tbUser = await _context.TbUsers.FirstOrDefaultAsync(u => u.NrRegister == param);
                        break;
                    case "cpf":
                        tbUser = await _context.TbUsers.FirstOrDefaultAsync(u => u.NrCpf == param);
                        break;
                    default:
                        return BadRequest("Tipo de parâmetro não suportado.");
                }

                if (tbUser == null)
                {
                    return NotFound(new { message = "Usuário não encontrado." });
                }

                var token = _tokenService.GenerateToken(tbUser);
                var from = "imscimmiesco@gmail.com";
                var emailAdress = tbUser.NmEmail;
                var emailModel = new EmailModel(emailAdress, "Atualização de senha", recuperaSenhaEmail.EmailStringBody(tbUser.IdUser, token));
                var userEmail = tbUser.IdUser;
                _emailService.SendEmail(emailModel);

                return Ok(new { StatusCode = 200, Message = "E-mail enviado com sucesso" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
        [HttpPost("trocarsenha")]
        public async Task<IActionResult> TrocaSenha([FromQuery] string userid, [FromQuery] string token, [FromBody] novaSenhaModel novaSenha)
        {
            try
            {
                var user = await _context.TbUsers.FirstOrDefaultAsync(u => u.IdUser == int.Parse(userid));
                if (user == null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Usuário não encontrado"
                    });
                }

                user.NmPassword = novaSenha.novaSenha;
                _context.TbUsers.Update(user);
                await _context.SaveChangesAsync();

                var response = new
                {
                    StatusCode = 200,
                    Message = "Senha trocada com sucesso"
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                // Lógica para lidar com erros, se houver algum.

                return BadRequest(new { StatusCode = 400, Message = "Erro ao trocar a senha" });
            }
        }

    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Helpers.EmailBodies;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.NovaPasta;
using WebAPI.Services;


namespace WebAPI.Controllers
{

    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private AreaInstedContext _context;
        private readonly IConfiguration _configuration;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IClienteIpService _clienteIpService;
        
        public AuthController(ITokenService tokenService, AreaInstedContext context, IConfiguration configuration, IEmailService emailService, IHttpContextAccessor httpContextAccessor,
            IClienteIpService clienteIpService)
        {
            _tokenService = tokenService;
            _context = context;
            _clienteIpService = clienteIpService;
            _configuration = configuration;
            _emailService = emailService;
            _httpContextAccessor = httpContextAccessor;
        }

        public class LoginModel
        {
            public string Login { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] LoginModel loginModel)
        {
            try
            {
                if (loginModel.Login.IsNullOrEmpty())
                {
                    return BadRequest(new { message = "Login vazio ou nulo." });
                }
                else if (loginModel.Password.IsNullOrEmpty())
                {
                    return BadRequest(new { message = "Senha vazia ou nula." });
                }

                var user = await _context.TbUsers.FirstOrDefaultAsync(u =>
                    (u.NrRegister == loginModel.Login || u.NmEmail == loginModel.Login || u.NrCpf == loginModel.Login));

                if (user == null)
                {

                    return NotFound(new { message = "Usuário inválido." });
                }
                else
                {
                    if (user.Numerotentativas % 3 == 0 && user.Numerotentativas > 0 && DateTime.Now - user.ultimaTentativaHora < TimeSpan.FromMinutes(3))
                    {
                        return Forbid();
                    }
                    if (!user.NmPassword.Equals(loginModel.Password))
                    {
                        user.Numerotentativas++;
                        user.ultimaTentativaHora = DateTime.Now;

                        _context.TbUsers.Update(user);
                        await _context.SaveChangesAsync();

                        return Unauthorized(new { message = "Senha incorreta." });
                    }
                }
                string ipAtualUsuario = _clienteIpService.GetClienteIpAddress();

                if (string.IsNullOrEmpty(user.ultimoIPlogado) || !user.ultimoIPlogado.Equals(ipAtualUsuario))
                {
                    user.ultimoIPlogado = ipAtualUsuario;
                    _context.TbUsers.Update(user);
                    await _context.SaveChangesAsync();
                    string horarioAcesso = DateTime.UtcNow.ToString("dd - MM - yyyy HH: mm:ss");
                    var ipInformationResult = await _clienteIpService.GetIpInformationAsync(ipAtualUsuario);

                    if (ipInformationResult is OkObjectResult okResult)
                    {
                        IpResponseDTO? ipInformationDto = okResult.Value as IpResponseDTO;
                        if(ipInformationDto != null)
                        {

                            var emailAdress = user.NmEmail;
                            var emailModel = new EmailModel(emailAdress, "Aviso de novo login", NovoAcessoEmail.EmailStringBody(user.NmUser, ipAtualUsuario, ipInformationDto.City, horarioAcesso));
                            _emailService.SendEmail(emailModel);
                        }

                    }
                    else if (ipInformationResult is BadRequestObjectResult badRequestResult)
                    {
                        var errorMessage = badRequestResult.Value?.ToString();
                        // Lide com a mensagem de erro conforme necessário
                    }
                }



                var token = _tokenService.GenerateToken(user);
                user.Numerotentativas = 0;
                user.ultimaTentativaHora = DateTime.Now;

                _context.TbUsers.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Usuário logado com sucesso!",
                    token = token
                });
            }
            catch (Exception ex)

            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}

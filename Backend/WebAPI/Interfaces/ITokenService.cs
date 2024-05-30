using WebAPI.Models;

namespace WebAPI.Services
{
    public interface ITokenService
    {
        string GenerateToken(TbUser user);
        bool ValidateToken(string token);
    }
}

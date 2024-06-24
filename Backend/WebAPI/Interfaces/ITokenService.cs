using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(TbUser user);
        bool ValidateToken(string token);
    }
}

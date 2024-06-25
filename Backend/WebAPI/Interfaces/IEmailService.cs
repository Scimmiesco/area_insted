using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IEmailService
    {
       public void SendEmail(EmailModel emailModel);
                
    }
}

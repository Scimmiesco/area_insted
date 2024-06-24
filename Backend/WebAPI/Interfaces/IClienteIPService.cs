using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Interfaces
{
    public interface IClienteIpService
    {
        string GetClienteIpAddress();
        Task<IActionResult> GetIpInformationAsync(string IpAddress);
    }

}

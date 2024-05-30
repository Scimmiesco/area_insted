using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebAPI.Interfaces;
using WebAPI.Models.NovaPasta;

public class ClienteIpService : IClienteIpService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ClienteIpService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetClienteIpAddress()
    {
        if (_httpContextAccessor.HttpContext?.Connection.RemoteIpAddress != null)
        {
            var ipAddress = this._httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            return ipAddress;
        }
        return string.Empty;
    }

    public async Task<IActionResult> GetIpInformationAsync(string ipAddress)
    {
        using var httpClient = new HttpClient();

        if (string.IsNullOrEmpty(ipAddress))
        {
            return new BadRequestObjectResult(new { message = "O endereço IP está vazio" });
        }

        string apiUrl = $"http://ip-api.com/json/{ipAddress}";

        try
        {
            var response = await httpClient.GetStringAsync(apiUrl);

            var apiResponseDto = JsonSerializer.Deserialize<IpResponseDTO>(response);

            return new OkObjectResult(new
            {
                success = true,
                data = apiResponseDto,
                message = "Informações do IP foram retornadas com sucesso."
            });
        }
        catch (HttpRequestException ex)
        {
            return new BadRequestObjectResult(new { message = ex.Message });
        }
    }

}
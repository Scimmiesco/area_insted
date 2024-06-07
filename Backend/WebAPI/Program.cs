using Azure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

var vaultUri = builder.Configuration["AzureKeyVault:VaultUri"];

if (vaultUri != null)
{
    var keyVaultEndpoint = new Uri(vaultUri);
    builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

    // Agora você pode acessar as configurações do Azure Key Vault diretamente usando Configuration.

    // Use a variável "connectionString" para a conexão com o banco de dados.
}
var connectionString = builder.Configuration.GetConnectionString("AreaInstedConnection");

builder.Services.AddDbContext<AreaInstedContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("AreaInstedConnection")));

var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("HashKeySettings:Key").Value);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IClienteIpService, ClienteIpService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options => options.AddPolicy(name: "AreaInstedOrigins",
    Policy =>
    {
        Policy.WithOrigins("https://localhost:4200", "https://areainsted.vercel.app", "https://desareainsted.vercel.app", "https://localhost:7003", "https://localhost", "http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    }
));
builder.Services.AddMvc().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null; // Use o mesmo nome da propriedade
});


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AreaInstedOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();

using CT.API.Middleware;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using CT.Application.Interfaces;
using CT.Application.Interfaces.Services;
using CT.Application.Orders.Commands;
using CT.Application.Orders.Handlers;
using CT.Application.Orders.Queries;
using CT.Application.Products.Handlers;
using CT.Application.Products.Queries;
using CT.Application.Users.Commands;
using CT.Application.Users.Handlers;
using CT.Application.Users.Queries;
using CT.Domain.Entities;
using CT.Infrastructure.Identity.Config;
using CT.Infrastructure.Identity.Services;
using CT.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    typeof(GetProductListQuery).Assembly,
    typeof(GetProductListHandler).Assembly,
    typeof(GetUserByEmailQuery).Assembly,
    typeof(GetUserByEmailHandler).Assembly,
    typeof(AuthenticateUserCommand).Assembly,
    typeof(AuthenticateUserHandler).Assembly,
    typeof(RegisterUserCommand).Assembly,
    typeof(RegisterUserHandler).Assembly,
    typeof(InvalidateRefreshTokenCommand).Assembly,
    typeof(InvalidateRefreshTokenHandler).Assembly,
    typeof(CreateOrderCommand).Assembly,
    typeof(CreateOrderHandler).Assembly,
    typeof(GetOrdersHandler).Assembly,
    typeof(GetOrdersQuery).Assembly
));

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
var jwtSettings = new JwtSettings();
builder.Configuration.Bind(nameof(JwtSettings), jwtSettings);
builder.Services.AddSingleton(jwtSettings);

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = true;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = true,
            ValidateLifetime = true
        };
    });
builder.Services.AddControllers(options =>
{
    options.Filters.Add(
        new AuthorizeFilter(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build()));
});

builder.Services.AddLogging();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseDatabaseCheck();

app.Run();
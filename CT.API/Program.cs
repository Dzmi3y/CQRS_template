using CT.Application.Products.Queries;
using CT.Domain.Interfaces.Repositories;
using CT.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    typeof(GetProductListQuery).Assembly,
    typeof(GetProductListHandler).Assembly
));
builder.Services.AddScoped<IProductRepository,ProductRepository>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

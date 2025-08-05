namespace CT.API.Middleware;
using CT.Application.Interfaces;

public static class DatabaseCheckMiddlewareExtensions
{
    public static IApplicationBuilder UseDatabaseCheck(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<IAppDbContext>();

        try
        {
            if (dbContext.CanConnect())
            {
                Console.WriteLine("The database is available.");
            }
            else
            {
                Console.WriteLine("The database is unavailable.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Database connection error: {ex.Message}");
        }

        return app;
    }
}

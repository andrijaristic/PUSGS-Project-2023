using ApiGateway.Middleware;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Serilog;
using Serilog.Events;

string _cors = "cors";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _cors, builder =>
    {
        builder.SetIsOriginAllowed(origin => true)
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
                     .AddJsonFile("ocelot.json", optional: false, reloadOnChange: true)
                     .AddEnvironmentVariables();

builder.Services.AddOcelot(builder.Configuration);

var logger = new LoggerConfiguration()
          .ReadFrom.Configuration(builder.Configuration)
          .MinimumLevel.Information()
          .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
          .Enrich.FromLogContext()
          .WriteTo.File(Path.Combine(@"Logs", "log.txt"), rollingInterval: RollingInterval.Day)
          .WriteTo.Console()
                  .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(_cors);
app.UseAuthorization();
app.MapControllers();
app.UseMiddleware<RequestResponseLoggingMiddleware>();

await app.UseOcelot();
app.Run();

using AutoMapper;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Server.Models.AppSettings;
using Server.Interfaces.RepositoryInterfaces;
using Server.Repositories;
using Server.Middleware;
using Server.Interfaces.ServiceInterfaces;
using Server.Services;
using Microsoft.AspNetCore.Identity;
using Server.Mapping;
using Server.Interfaces.ServiceInterfaces.UtilityInterfaces;
using Server.Services.Utility;

string _cors = "cors";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "eShop API",
        Description = "PUSGS eShop API"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Input token",
        Scheme = "bearer",
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
            },
            new string[]{}
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings")["SecretKey"]));
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "http://localhost:7060",
        IssuerSigningKey = key
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _cors, builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed(origin => true)
               .AllowCredentials();
    });
});

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddOptions();

#region Service and Repository registrations
builder.Services.AddScoped<IAuthHelperService, AuthHelperService>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
#endregion

builder.Services.AddDbContext<eShopDbContext>(options => 
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("eShopDatabase"), 
            b => b.MigrationsAssembly("Server"))
        );

#region Mapper registration
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new UserMappingProfile());
    mc.AddProfile(new ProductMappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
#endregion

// Middleware
// Transient services are made and destroyed multiple times per request
// Created for each object in request, every time it uses memory & resources
builder.Services.AddTransient<ExceptionHandlingMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(_cors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

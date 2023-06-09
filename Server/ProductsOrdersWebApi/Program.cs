using AutoMapper;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Server.Services;
using ProductsOrdersWebApi.Services;
using ProductsOrdersWebApi.Infrastructure;
using ProductsOrdersWebApi.Mapping;
using ProductsOrdersWebApi.Models.AppSettings;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces.UtilityInterfaces;
using ProductsOrdersWebApi.Services.Utility;
using ProductsOrdersWebApi.Repositories;
using ProductsOrdersWebApi.Interfaces.RepositoryInterfaces;
using ProductsOrdersWebApi.Interfaces.ServiceInterfaces;
using ProductsOrdersWebApi.Middleware;
using System.Text.Json.Serialization;

string _cors = "cors";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
                .AddDapr()
                .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "eShop Products and Orders API",
        Description = "PUSGS eShop Products and Orders API"
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
builder.Services.AddTransient<IAuthHelperService, AuthHelperService>();
builder.Services.AddTransient<IImageService, ImageService>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
#endregion

builder.Services.AddDbContext<ProductOrdersDbContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("ProductsOrdersDatabase"),
            b => b.MigrationsAssembly("ProductsOrdersWebApi"))
        );

#region Mapper registration
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new ProductMappingProfile());
    mc.AddProfile(new OrderMappingProfile());
    mc.AddProfile(new OrderItemMappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
#endregion

// Middleware
// Transient services are made and destroyed multiple times per request
// Created for each object in request, every time it uses memory & resources
builder.Services.AddTransient<ExceptionHandlingMiddleware>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ProductOrdersDbContext>();
    context.Database.EnsureCreated();
}

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
using Server.Exceptions.Common;
using System.Text.Json;

namespace Server.Middleware
{
    public class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger) => _logger = logger;

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            // Handles request
            // If exception, handles it and produces appropriate HTTP response
            try
            {
                await next(context);
            } catch (Exception ex) 
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            // Sets ContentType and StatusCode of response that is being sent to client
            // Uses our homemade exceptions as bases for 400 and 404 response codes
            // Homemade specific exceptions will trigger this middleware since they inherit BadReq. and NotFound exceptions
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exception switch
            {
                BadRequestException => StatusCodes.Status400BadRequest,
                NotFoundException => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError
            };

            // Response message 
            var response = new
            {
                error = exception.Message
            };

            // Sending response to client
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

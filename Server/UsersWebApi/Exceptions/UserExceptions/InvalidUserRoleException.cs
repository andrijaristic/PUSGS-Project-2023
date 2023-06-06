using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserRoleException : BadRequestException
    {
        public InvalidUserRoleException(string role) : base($"Entered role ({role}) is not a valid user role")
        {

        }
    }
}

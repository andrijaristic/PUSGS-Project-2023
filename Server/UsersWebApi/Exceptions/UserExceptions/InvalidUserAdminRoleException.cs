using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserAdminRoleException : BadRequestException
    {
        public InvalidUserAdminRoleException() : base("ADMIN Role cannot be chosen as option on account creation")
        {

        }
    }
}

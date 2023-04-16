using Server.Exceptions.Common;

namespace Server.Exceptions.UserExceptions
{
    public sealed class InvalidUserAdminRoleException : BadRequestException
    {
        public InvalidUserAdminRoleException() : base("ADMIN Role cannot be chosen as option on account creation")
        {

        }
    }
}

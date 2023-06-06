using UsersWebApi.Exceptions.Common;

namespace UsersWebApi.Exceptions.UserExceptions
{
    public sealed class InvalidUserDateOfBirthException : BadRequestException
    {
        public InvalidUserDateOfBirthException(string dateOfBirth) : base($"Entered date of birth [DD/MM/YY] ({dateOfBirth}) is not old enough to be valid date of birth")
        {

        }
    }
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Update.Internal;
using UsersWebApi.Enums;

namespace UsersWebApi.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }   
        public string Name { get; set; }
        public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.PENDING;
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        public string ImageURL { get; set; }
        public bool FinishedRegistration { get; set; } = false;

        public void Update(string address, string name, DateTime dateOfBirth)
        {
            Name = name;
            Address = address;
            DateOfBirth = dateOfBirth;  
        }
    }
}

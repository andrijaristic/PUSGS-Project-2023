using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Server.Enums;

namespace Server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }   
        public string Name { get; set; }
        public bool isVerified { get; set; } = false;
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        // public string ImageURL { get; set; }
        public List<Product> Products { get; set; }  // Will be empty for Buyer, Admin
        public List<Order> Orders { get; set; } // Will be empty for Admin

        public void Update(string address, string name, DateTime dateOfBirth)
        {
            Name = name;
            Address = address;
            DateOfBirth = dateOfBirth;  
        }
    }
}

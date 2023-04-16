﻿namespace Server.Exceptions.Common
{
    public abstract class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) 
        {
        
        }
    }
}

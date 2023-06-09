﻿using Server.Models;

namespace Server.Interfaces.RepositoryInterfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> FindByUsername(string username);
        Task<List<User>> GetSellers();
        Task<Guid> FindUserIdByUsername(string username);
        Task<List<User>> GetVerifiedSellers();
    }
}

using ControleFinanceiro.BLL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<int> GetUsersNumber();
        Task<IdentityResult> CreateUser(User user, string senha);
        Task AddUserRole(User user, string funcao);
        Task UserLogin(User user, bool lembrar);
        Task<User> GetByEmail(string email);
        Task<IList<string>> GetRoles(User user);

    }
}

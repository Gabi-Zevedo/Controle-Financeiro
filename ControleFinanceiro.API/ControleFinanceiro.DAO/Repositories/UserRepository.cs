using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly Context _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(Context context, UserManager<User> userManager, SignInManager<User> signInManager) : base(context)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task AddUserRole(User user, string funcao)
        {
            try
            {
                await _userManager.AddToRoleAsync(user, funcao);

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<IdentityResult> CreateUser(User user, string senha)
        {

            try
            {
                return await _userManager.CreateAsync(user, senha);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<User> GetByEmail(string email)
        {

            try
            {
                return await _userManager.FindByEmailAsync(email);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<IList<string>> GetRoles(User user)
        {

            try
            {
                return await _userManager.GetRolesAsync(user);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<int> GetUsersNumber()
        {

            try
            {
                return await _context.User.CountAsync();
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task UserLogin(User user, bool lembrar)
        {

            try
            {
                await _signInManager.SignInAsync(user, false);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}

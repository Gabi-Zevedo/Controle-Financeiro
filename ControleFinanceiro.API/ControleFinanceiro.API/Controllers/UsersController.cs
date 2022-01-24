using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL;
using ControleFinanceiro.DAL.Interfaces;
using System.IO;
using ControleFinanceiro.API.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        [HttpPost("SalvarFoto")]
        public async Task<ActionResult> SalvarFoto()
        {
            var foto = Request.Form.Files[0];
            byte[] b;

            using (var openReadStream = foto.OpenReadStream())
            {
                using (var memoryStream = new MemoryStream())
                {
                    await openReadStream.CopyToAsync(memoryStream);
                    b = memoryStream.ToArray();
                }
            }
            return Ok(new
            {
                foto = b

            });
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult> CreateUser(RegistroViewModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult userCreated;
                string userRole;

                User user = new User
                {
                    UserName = model.UserName,
                    CPF = model.CPF,
                    Profissao = model.Profissao,
                    Foto = model.Foto,
                    Email = model.Email,
                    PasswordHash = model.Senha,
                };

                if(await _userRepository.GetUsersNumber() > 0)
                {
                    userRole = "Usuario";
                }
                else
                {
                    userRole = "Administrador";
                }

                userCreated = await _userRepository.CreateUser(user, model.Senha);

                if (userCreated.Succeeded)
                {
                    await _userRepository.AddUserRole(user, userRole);
                    await _userRepository.UserLogin(user, false);

                    return Ok(new
                    {
                        loggedEmail = user.Email,
                        userId = user.Id
                    });
                }
                else
                {
                    return BadRequest(model);
                }
            }

            return BadRequest(model);
        }
    }
}

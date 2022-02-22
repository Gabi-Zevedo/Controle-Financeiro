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
using ControleFinanceiro.API.Services;

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
        public async Task<ActionResult<UpdateUserViewModel>> GetUser(string id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }
            UpdateUserViewModel model = new UpdateUserViewModel
            {
                Id = user.Id,
                UserName = user.UserName,
                CPF = user.CPF,
                Profissao = user.Profissao,
                Foto = user.Foto,
                Email = user.Email,
            };

            return model;
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

                if (await _userRepository.GetUsersNumber() > 0)
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
                    var token = TokenService.GenerateToken(user, userRole);
                    await _userRepository.UserLogin(user, false);

                    return Ok(new
                    {
                        loggedEmail = user.Email,
                        userId = user.Id,
                        user = user.UserName,
                        userToken = token
                    });
                }
                else
                {
                    return BadRequest(model);
                }
            }

            return BadRequest(model);
        }

        [HttpPost("UserLogin")]
        public async Task<ActionResult> UserLogin(LoginViewModel model)
        {
            if (model == null)
            {
                return NotFound("Usuario ou Senha inválidos");
            }

            User user = await _userRepository.GetByEmail(model.Email);

            if (user != null)
            {
                PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
                if (passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Senha) != PasswordVerificationResult.Failed)
                {
                    var userRole = await _userRepository.GetRoles(user);
                    var token = TokenService.GenerateToken(user, userRole.First());
                    await _userRepository.UserLogin(user, false);

                    return Ok(new
                    {
                        loggedUser = user.Email,
                        userId = user.Id,
                        user = user.UserName,
                        userToken = token
                    });
                }

                return NotFound("Usuario ou Senha inválidos");
            }

            return NotFound("Usuario ou Senha inválidos");
        }
        [HttpGet("GetUserFoto/{userId}")]
        public async Task<dynamic> GetUserFoto(string userId)
        {
            User user = await _userRepository.GetById(userId);
            return new { image = user.Foto };
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UpdateUserViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                User user = await _userRepository.GetById(viewModel.Id);
                user.UserName = viewModel.UserName;
                user.CPF = viewModel.CPF;
                user.Profissao = viewModel.Profissao;
                user.Foto = viewModel.Foto;
                user.Email = viewModel.Email;

                await _userRepository.UpdateUser(user);

                return Ok(new
                {
                    message = $"Usuário {user.UserName} atualizado com sucesso"
                });
            }

            return BadRequest(viewModel);
        }
    }
}

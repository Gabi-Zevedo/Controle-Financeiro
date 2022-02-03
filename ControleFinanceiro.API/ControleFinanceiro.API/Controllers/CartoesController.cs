using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartoesController : ControllerBase
    {
        private readonly ICartaoRepository _cartaoRepository;

        public CartoesController(ICartaoRepository cartaoRepository)
        {
            _cartaoRepository = cartaoRepository;
        }

        [HttpGet("GetCartoesByUserId/{userId}")]
        public async Task<IEnumerable<Cartao>> GetCartoesByUserIdAsync(string userId)
        {
            return await _cartaoRepository.GetCartoesByUserId(userId).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cartao>> GetCartao(int id)
        {
            Cartao cartao = await _cartaoRepository.GetById(id);

            if (cartao == null)
            {
                return NotFound();
            }
            return cartao;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutCartao(int id, Cartao cartao)
        {
            if (id != cartao.CartaoId)
            {
                return BadRequest("Cartões Diferentes");
            }

            if (ModelState.IsValid)
            {
                await _cartaoRepository.Update(cartao);

                return Ok(new
                {
                    message = $"Cartão: {cartao.Numero}. foi atualizado com sucesso"
                });
            }

            return BadRequest(cartao);
        }

        [HttpPost]
        public async Task<ActionResult> PostCartao(Cartao cartao)
        {
            if (ModelState.IsValid)
            {
                await _cartaoRepository.Add(cartao);

                return Ok(new
                {
                    message = $"Cartão: {cartao.Numero}. foi inserido com sucesso"
                });
            }

            return BadRequest(cartao);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCartao(int id)
        {
            Cartao cartao = await _cartaoRepository.GetById(id);

            if (cartao == null)
            {
                return NotFound();
            }

            await _cartaoRepository.Delete(cartao);

            return Ok(new
            {
                message = $"Cartão: {cartao.Numero}. foi deletado com sucesso"
            });
        }

        [HttpGet("filtrarCartoes/{termo}")]
        public async Task<ActionResult<IEnumerable<Cartao>>> FiltrarFuncoes(string termo)
        {
            return await _cartaoRepository.FiltrarCartao(termo).ToListAsync();
        }
    }
}

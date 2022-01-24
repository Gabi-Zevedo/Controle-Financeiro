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
using ControleFinanceiro.API.ViewModels;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncoesController : ControllerBase
    {
        private readonly IFuncaoRepository _funcaoRepository;

        public FuncoesController(IFuncaoRepository funcaoRepository)
        {
            _funcaoRepository = funcaoRepository;
        }

        // GET: api/Funcoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Funcao>>> GetFuncoes()
        {
            return await _funcaoRepository.GetAll().ToListAsync();
        }

        // GET: api/Funcoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Funcao>> GetFuncao(string id)
        {
            var funcao = await _funcaoRepository.GetById(id);

            if (funcao == null)
            {
                return NotFound();
            }

            return funcao;
        }

        // PUT: api/Funcoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncao(string id, FuncaoViewModel funcaoDto)
        {
            if (id != funcaoDto.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                Funcao funcao = new Funcao
                {
                    Id = funcaoDto.Id,
                    Name = funcaoDto.Name,
                    Descricao = funcaoDto.Descricao
                };

                await _funcaoRepository.UpdateFuncao(funcao);

                return Ok(new
                {
                    message = $"{funcao.Name} atualizado com sucesso"
                });
            }
            return BadRequest(ModelState);
        }

        // POST: api/Funcoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Funcao>> PostFuncao(FuncaoViewModel funcaoDto)
        {
            if (ModelState.IsValid)
            {
                Funcao funcao = new Funcao
                {
                    Name = funcaoDto.Name,
                    Descricao = funcaoDto.Descricao
                };

                await _funcaoRepository.AddFuncao(funcao);

                return Ok(new
                {
                    message = $"{funcao.Name} adicionada com sucesso"
                });
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/Funcoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncao(string id)
        {
            var funcao = await _funcaoRepository.GetById(id);
            if (funcao == null)
            {
                return NotFound();
            }
            await _funcaoRepository.Delete(funcao);

            return Ok(new
            {
                message = $"{funcao.Name} excluido com sucesso"
            });
        }

        [HttpGet("filtrarFuncoes/{termo}")]
        public async Task<ActionResult<IEnumerable<Funcao>>> FiltrarFuncoes(string termo)
        {
            return await _funcaoRepository.FiltrarFuncao(termo).ToListAsync();
        }



    }
}

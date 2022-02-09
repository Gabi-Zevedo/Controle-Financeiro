using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesasController : ControllerBase
    {

        private readonly IDespesaRepository _despesaRepository;

        public DespesasController(IDespesaRepository despesaRepository)
        {
            _despesaRepository = despesaRepository;
        }

        // GET: api/<DespesasController>
        [HttpGet("GetDespesasByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Despesa>>> GetDespesasByUserId(string userId)
        {
            return await _despesaRepository.GetByUserId(userId).ToListAsync();
        }

        // GET api/<DespesasController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Despesa>> Get(int id)
        {
            Despesa despesa = await _despesaRepository.GetById(id);

            if (despesa == null)
            {
                return NotFound();
            }

            return despesa;
        }

        // POST api/<DespesasController>
        [HttpPost]
        public async Task<ActionResult<Despesa>> Post(Despesa despesa)
        {
            if (ModelState.IsValid)
            {
                await _despesaRepository.Add(despesa);

                return Ok(new
                {
                    message = $"Despesa de R$:{despesa.Valor} criada com sucesso"
                });
            }

            return BadRequest(despesa);
        }

        // PUT api/<DespesasController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Despesa>> Put(int id, Despesa despesa)
        {
            if (id != despesa.DespesaId)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                await _despesaRepository.Update(despesa);
                return Ok(new
                {
                    message = $"Despesa de R$:{despesa.Valor} atualizada com sucesso"
                });
            }

            return BadRequest(despesa);
        }

        // DELETE api/<DespesasController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Despesa>> Delete(int id)
        {
            Despesa despesa = await _despesaRepository.GetById(id);

            if (despesa == null)
            {
                return NotFound();
            }
            await _despesaRepository.Delete(despesa);
            return Ok(new
            {
                message = $"Despesa de R$:{despesa.Valor} excluida com sucesso"
            });
        }
    }
}

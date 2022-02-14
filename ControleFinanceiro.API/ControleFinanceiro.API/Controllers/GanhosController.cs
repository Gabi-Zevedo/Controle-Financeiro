using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
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
    public class GanhosController : ControllerBase
    {

        private readonly IGanhoRepository _ganhoRepository;

        public GanhosController(IGanhoRepository ganhoRepository)
        {
            _ganhoRepository = ganhoRepository;
        }

        // GET: api/<GanhosController>
        [HttpGet("GetGanhosByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Ganho>>> GetGanhosByUserId(string userId)
        {
            return await _ganhoRepository.GetByUserId(userId).ToListAsync();
        }

        // GET api/<GanhosController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ganho>> Get(int id)
        {
            Ganho ganho = await _ganhoRepository.GetById(id);

            if (ganho == null)
            {
                return NotFound();
            }

            return ganho;
        }

        // POST api/<GanhosController>
        [HttpPost]
        public async Task<ActionResult<Ganho>> Post(Ganho ganho)
        {
            if (ModelState.IsValid)
            {
                await _ganhoRepository.Add(ganho);

                return Ok(new
                {
                    message = $"Ganho de R$:{ganho.Valor} criado com sucesso"
                });
            }

            return BadRequest(ganho);
        }

        // PUT api/<GanhosController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Ganho>> Put(int id, Ganho ganho)
        {
            if (id != ganho.GanhoId)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                await _ganhoRepository.Update(ganho);
                return Ok(new
                {
                    message = $"Ganho de R$:{ganho.Valor} atualizado com sucesso"
                });
            }

            return BadRequest(ganho);
        }

        // DELETE api/<GanhosController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ganho>> Delete(int id)
        {
            Ganho ganho = await _ganhoRepository.GetById(id);

            if (ganho == null)
            {
                return NotFound();
            }
            await _ganhoRepository.Delete(ganho);
            return Ok(new
            {
                message = $"Ganho de R$:{ganho.Valor} excluido com sucesso"
            });
        }

        [HttpGet("filtrarGanhos/{termo}")]
        public async Task<ActionResult<IEnumerable<Ganho>>> FiltrarGanhos(string termo)
        {
            return await _ganhoRepository.FiltrarGanho(termo).ToListAsync();
        }
    }
}


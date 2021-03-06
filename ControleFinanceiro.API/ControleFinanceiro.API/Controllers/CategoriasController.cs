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
using Microsoft.AspNetCore.Authorization;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriasController(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        // GET: api/Categorias
        [HttpGet]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            return await _categoriaRepository.GetAll().ToListAsync();
        }

        // GET: api/Categorias/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            var categoria = await _categoriaRepository.GetById(id);

            if (categoria == null)
            {
                return NotFound();
            }

            return categoria;
        }

        // PUT: api/Categorias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> PutCategoria(int id, Categoria categoria)
        {
            if (id != categoria.CategoriaId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _categoriaRepository.Update(categoria);
                return Ok(new
                {
                    message = $"{categoria.Nome} atualizado com sucesso"
                });
            }

            return BadRequest(ModelState);
        }

        // POST: api/Categorias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            if (ModelState.IsValid)
            {
                await _categoriaRepository.Add(categoria);

                return Ok(new
                {
                    message = $"{categoria.Nome} inserido com sucesso"
                });
            }
            return BadRequest(categoria);
        }

        // DELETE: api/Categorias/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var categoria = await _categoriaRepository.GetById(id);
            if (categoria == null)
            {
                return NotFound();
            }

            await _categoriaRepository.Delete(id);

            //await _categoriaRepository.Update(categoria);
            return Ok(new
            {
                message = $"{categoria.Nome} excluido com sucesso"
            });
        }

        [HttpGet("filtrarCategorias/{termo}")]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategorias(string termo)
        {
            return await _categoriaRepository.FiltrarCategoria(termo).ToListAsync();
        }

        [HttpGet("filtrarCategoriasDespesas")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategoriasDespesas()
        {
            return await _categoriaRepository.GetCategoriasByTipo("Despesa").ToListAsync();
        }

        [HttpGet("filtrarCategoriasganhos")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategoriasganhos()
        {
            return await _categoriaRepository.GetCategoriasByTipo("Ganho").ToListAsync();
        }


    }
}

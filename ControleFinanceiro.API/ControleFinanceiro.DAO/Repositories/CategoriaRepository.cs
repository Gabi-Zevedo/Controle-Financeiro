using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class CategoriaRepository : GenericRepository<Categoria>, ICategoriaRepository
    {
        private readonly Context _context;

        public CategoriaRepository(Context context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Categoria> FiltrarCategoria(string termo)
        {
            try
            {
                return _context.Categorias.Include(c => c.Tipo)
                    .Where(c => c.Nome.Contains(termo));
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}");
            }
        }

        public new IQueryable<Categoria> GetAll()
        {

            try
            {
                return _context.Categorias.Include(c => c.Tipo);
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}");
            }
        }

        public new async Task<Categoria> GetById(int id)
        {

            try
            {
                var entity = await _context.Categorias.Include(c => c.Tipo).FirstOrDefaultAsync(c => c.CategoriaId == id);
                return entity;
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}");
            }
        }

        public IQueryable<Categoria> GetCategoriasByTipo(string tipo)
        {
            try
            {
                return _context.Categorias.Include(c => c.Tipo).Where(c => c.Tipo.Nome == tipo);
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}");
            }
        }
    }
}

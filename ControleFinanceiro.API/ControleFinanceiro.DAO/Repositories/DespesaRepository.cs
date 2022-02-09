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
    public class DespesaRepository : GenericRepository<Despesa>, IDespesaRepository
    {
        private readonly Context _context;
        public DespesaRepository(Context context) : base(context)
        {
            _context = context;
        }

        public void DeleteDespesas(IEnumerable<Despesa> despesas)
        {
            try
            {
                _context.Despesas.RemoveRange(despesas);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<IEnumerable<Despesa>> GetByCartaoId(int cartaoId)
        {
            try
            {
                return await _context.Despesas.Where(d => d.CartaoId == cartaoId).ToListAsync();

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        IQueryable<Despesa> IDespesaRepository.GetByUserId(string userId)
        {
            try
            {
                return _context.Despesas.Include(d => d.Cartao).Include(c => c.Categoria).Where(d => d.UserId == userId);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}

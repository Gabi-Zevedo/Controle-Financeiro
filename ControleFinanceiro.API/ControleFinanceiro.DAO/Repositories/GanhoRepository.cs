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
    public class GanhoRepository : GenericRepository<Ganho>, IGanhoRepository
    {
        private readonly Context _context;
        public GanhoRepository(Context context) : base(context)
        {
            _context = context;
        }

        public void DeleteGanhos(IEnumerable<Ganho> ganhos)
        {
            try
            {
                _context.Ganhos.RemoveRange(ganhos);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public IQueryable<Ganho> FiltrarGanho(string termo)
        {
            try
            {
                return _context.Ganhos.Include(d => d.Month).Include(d => d.Categoria).Where(d => d.Descricao.Contains(termo));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<double> GetGanhoByUserId(string userId)
        {
            try
            {
                return await _context.Ganhos.Where(g => g.UserId == userId).SumAsync(g => g.Valor);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        IQueryable<Ganho> IGanhoRepository.GetByUserId(string userId)
        {
            try
            {
                return _context.Ganhos.Include(c => c.Categoria).Include(c => c.Month).Where(d => d.UserId == userId);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
    }


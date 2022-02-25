using ControleFinanceiro.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class GraficoRepository : IGraficoRepository
    {
        private readonly Context _context;
        public GraficoRepository(Context context)
        {
            _context = context;
        }

        public object GetYearDespesasByUserId(string userId, int year)
        {
            try
            {
                return _context.Despesas
                    .Where(d => d.UserId == userId && d.Year == year)
                    .OrderBy(d => d.MonthId)
                    .GroupBy(m => m.MonthId)
                    .Select(d => new
                    {
                        MonthId = d.Key,
                        ValorTotal = d.Sum(x => x.Valor)
                    }); 
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public object GetYearGanhosByUserId(string userId, int year)
        {
            try
            {
                return _context.Ganhos
                    .Where(d => d.UserId == userId && d.Year == year)
                    .OrderBy(d=>d.MonthId)
                    .GroupBy(m => m.MonthId)
                    .Select(d => new
                    {
                        MonthId = d.Key,
                        ValorTotal = d.Sum(x => x.Valor)
                    });

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}

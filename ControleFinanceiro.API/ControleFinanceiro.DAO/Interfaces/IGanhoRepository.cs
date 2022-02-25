using ControleFinanceiro.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IGanhoRepository : IGenericRepository<Ganho>
    {
        IQueryable<Ganho> GetByUserId(string userId);
        void DeleteGanhos(IEnumerable<Ganho> ganhos);
        IQueryable<Ganho> FiltrarGanho(string termo);
        Task<double> GetGanhoByUserId(string userId);
    }
}

using ControleFinanceiro.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IDespesaRepository : IGenericRepository<Despesa>
    {
        IQueryable<Despesa> GetByUserId(string userId);
        void DeleteDespesas(IEnumerable<Despesa> despesas);
        IQueryable<Despesa> FiltrarDespesa(string termo);
        Task<IEnumerable<Despesa>> GetByCartaoId(int cartaoId);
    }
}

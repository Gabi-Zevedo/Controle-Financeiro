using ControleFinanceiro.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface ICartaoRepository : IGenericRepository<Cartao>
    {
        IQueryable<Cartao> GetCartoesByUserId(string userId);
        IQueryable<Cartao> FiltrarCartao(string termo);
    }
}

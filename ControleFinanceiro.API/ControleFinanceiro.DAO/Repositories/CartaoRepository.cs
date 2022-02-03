using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class CartaoRepository : GenericRepository<Cartao>, ICartaoRepository
    {
        private readonly Context _context;

        public CartaoRepository(Context context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Cartao> FiltrarCartao(string termo)
        {
            try
            {
                var entity = _context.Cartoes.Where(c => c.Nome.ToLower().Contains(termo.ToLower()));
                return entity;
            }
            catch (Exception e)
            {

                throw new Exception (e.Message);
            }
        }

        public IQueryable<Cartao> GetCartoesByUserId(string userId)
        {
            try
            {
                return _context.Cartoes.Where(c => c.UserId == userId);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}

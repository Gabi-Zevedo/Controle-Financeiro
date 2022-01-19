using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class TipoRepository : GenericRepository<Tipo>, ITipoRepository
    {
        public TipoRepository(Context context) : base(context)
        {
        }
    }
}

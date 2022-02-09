using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class MonthRepository : GenericRepository<Month>, IMonthRepository
    {
        public MonthRepository(Context context) : base(context)
        {
        }
    }
}

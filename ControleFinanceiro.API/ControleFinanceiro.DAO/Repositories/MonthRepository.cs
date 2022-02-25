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
        private readonly Context _context;
        public MonthRepository(Context context) : base(context)
        {
            _context = context;
        }

        public new IQueryable<Month> GetAll()
        {
            try
            {
                return _context.Months.OrderBy(m => m.MonthId);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}

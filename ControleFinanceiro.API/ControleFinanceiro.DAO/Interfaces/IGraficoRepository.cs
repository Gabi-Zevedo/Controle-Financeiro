using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IGraficoRepository
    {
        object GetYearGanhosByUserId(string userId, int year);
        object GetYearDespesasByUserId(string userId, int year);
    }
}

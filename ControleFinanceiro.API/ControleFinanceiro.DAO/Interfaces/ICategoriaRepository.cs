using ControleFinanceiro.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface ICategoriaRepository : IGenericRepository<Categoria>
    {
        new IQueryable<Categoria> GetAll();
        new Task<Categoria> GetById(int id);

        IQueryable<Categoria> FiltrarCategoria(string termo);
    }


}

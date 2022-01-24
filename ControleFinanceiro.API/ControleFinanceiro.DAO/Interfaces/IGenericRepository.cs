using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> GetById(int id);
        Task<T> GetById(string id);
        Task Add(T entity);
        Task Add(List<T> entity);
        Task Update(T entity);
        Task Delete(int id);
        Task Delete(string id);
        Task Delete(T entity);

    }
}

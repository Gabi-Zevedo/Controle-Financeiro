using ControleFinanceiro.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly Context _context;

        public GenericRepository(Context context)
        {
            _context = context;
        }

        public async Task Add(T entity)
        {
            try
            {
                await _context.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }

        public async Task Add(List<T> entity)
        {

            try
            {
                await _context.AddRangeAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}");
            }
        }

        public async Task Delete(int id)
        {
            
            try
            {
                var entity = await GetById(id);
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }

        public async Task Delete(string id)
        {
            
            try
            {
                var entity = await GetById(id);
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }

        public async Task Delete(T entity)
        {

            try
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}");
            }
        }

        public  IQueryable<T> GetAll()
        {
            
            try
            {
                return _context.Set<T>();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }

        public async Task<T> GetById(int id)
        {
            
            try
            {
                var entity = await _context.Set<T>().FindAsync(id);
                return entity;
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }

        public async Task<T> GetById(string id)
        {
            
            try
            {
                var entity = await _context.Set<T>().FindAsync(id);
                return entity;
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }

        public async Task Update(T entity)
        {
            
            try
            {
                var registro = _context.Set<T>().Update(entity);
                registro.State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw new Exception($"Erro: {e.Message}"); 
            }
        }
    }
}

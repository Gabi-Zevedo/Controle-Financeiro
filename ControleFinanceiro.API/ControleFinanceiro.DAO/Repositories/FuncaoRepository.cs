using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositories
{
    public class FuncaoRepository : GenericRepository<Funcao>, IFuncaoRepository
    {
        private readonly Context _context;
        private readonly RoleManager<Funcao> _roleManager;

        public FuncaoRepository(Context context, RoleManager<Funcao> roleManager) : base(context)
        {
            _context = context;
            _roleManager = roleManager;
        }

        public async Task AddFuncao(Funcao funcao)
        {
            try
            {
                await _roleManager.CreateAsync(funcao);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public  IQueryable<Funcao> FiltrarFuncao(string termo)
        {
            try
            {
                var entity =  _context.Funcoes.Where(f => f.Name.ToLower().Contains(termo.ToLower()));
                return entity;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task UpdateFuncao(Funcao funcao)
        {
            try
            {
                Funcao f = await GetById(funcao.Id);
                f.Name = funcao.Name;
                f.NormalizedName = funcao.NormalizedName;
                f.Descricao = funcao.Descricao;

                await _roleManager.UpdateAsync(f);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}

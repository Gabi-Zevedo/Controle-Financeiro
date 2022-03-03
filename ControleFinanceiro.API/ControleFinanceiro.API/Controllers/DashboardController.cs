using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ICartaoRepository _cartaoRepository;
        private readonly IGanhoRepository _ganhosRepository;
        private readonly IDespesaRepository _despesaRepository;
        private readonly IMonthRepository _monthRepository;
        private readonly IGraficoRepository _graficoRepository;

        public DashboardController(ICartaoRepository cartaoRepository, IGanhoRepository ganhosRepository, IDespesaRepository despesaRepository, IMonthRepository monthRepository, IGraficoRepository graficoRepository)
        {
            _cartaoRepository = cartaoRepository;
            _ganhosRepository = ganhosRepository;
            _despesaRepository = despesaRepository;
            _monthRepository = monthRepository;
            _graficoRepository = graficoRepository;
        }

        [HttpGet("GetDadosCardsDashboard/{userId}")]
        public async Task<ActionResult<DadosCardsDashboardViewModel>> GetDadosCardsDashboard(string userId)
        {
            int qtdCartoes = await _cartaoRepository.GetQtdCartoesByUserId(userId);
            double ganhoTotal = Math.Round(await _ganhosRepository.GetGanhoByUserId(userId), 2);
            double despesaTotal = Math.Round(await _despesaRepository.GetDespesaByUserId(userId), 2);
            double saldo = Math.Round(ganhoTotal - despesaTotal, 2);

            DadosCardsDashboardViewModel model = new DadosCardsDashboardViewModel
            {
                QtdCartoes = qtdCartoes,
                GanhoTotal = ganhoTotal,
                DespesaTotal = despesaTotal,
                Saldo = saldo
            };
            return model;
        }

        [HttpGet("GetYearDataByUserId/{userid}/{year}")]
        public object GetYearDataByUserId(string userId, int year)
        {
            var obj = new
            {
                ganhos = _graficoRepository.GetYearGanhosByUserId(userId, year),
                despesas = _graficoRepository.GetYearDespesasByUserId(userId, year),
                months = _monthRepository.GetAll()
            };

            return (obj);
        }
    }

}

using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthsController : ControllerBase
    {
        private readonly IMonthRepository _monthRepository;

        public MonthsController(IMonthRepository monthRepository)
        {
            _monthRepository = monthRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Month>>> Get()
        {
            return await _monthRepository.GetAll().ToListAsync();
        }
    }
}

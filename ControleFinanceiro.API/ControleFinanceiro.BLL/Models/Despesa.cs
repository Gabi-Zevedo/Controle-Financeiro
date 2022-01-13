using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.BLL.Models
{
    public class Despesa
    {
        public int DespesaId { get; set; }
        public int CartaoId { get; set; }
        public Cartao Cartao { get; set; }
        public string Descricao { get; set; }
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
        public double Valor { get; set; }
        public int Day { get; set; }
        public int MonthId { get; set; }
        public Month Month { get; set; }
        public int Year { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }


    }
}

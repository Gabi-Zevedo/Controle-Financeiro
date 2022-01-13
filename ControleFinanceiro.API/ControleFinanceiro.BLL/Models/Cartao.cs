﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.BLL.Models
{
    public class Cartao
    {
        public int CartaoId { get; set; }
        public string Nome { get; set; }
        public string Bandeira { get; set; }
        public string Numero { get; set; }
        public string Limite { get; set; }
        public string UserId { get; set; }
        public User User{ get; set; }
        public virtual ICollection<Despesa> Despesas { get; set; }
    }
}

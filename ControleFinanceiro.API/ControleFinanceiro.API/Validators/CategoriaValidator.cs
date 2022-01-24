using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validators
{
    public class CategoriaValidator : AbstractValidator<Categoria>
    {
        public CategoriaValidator()
        {
            RuleFor(c => c.Nome)
                .NotNull().WithMessage("*Nome é Obrigatório")
                .NotEmpty().WithMessage("*Nome é Obrigatório")
                .MinimumLength(3).WithMessage("Nome precisa ter mais de 3 letras")
                .MaximumLength(50).WithMessage("Nome precisa ter menos de 50 letras");

            RuleFor(c => c.Icon)
                .NotNull().WithMessage("*Ícone é Obrigatório")
                .NotEmpty().WithMessage("*Ícone é Obrigatório")
                .MinimumLength(1).WithMessage("Nome do ícone precisa ter mais de 1 letra")
                .MaximumLength(50).WithMessage("Nome do ícone precisa ter menos de 50 letras");

            RuleFor(c => c.TipoId)
                .NotNull().WithMessage("Selecione um Tipo")
                .NotEmpty().WithMessage("Selecione um Tipo");
        }
    }
}

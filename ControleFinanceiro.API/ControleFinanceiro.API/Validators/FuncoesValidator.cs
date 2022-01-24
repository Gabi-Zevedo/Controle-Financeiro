using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validators
{
    public class FuncoesValidator : AbstractValidator<FuncaoViewModel>
    {
        public FuncoesValidator()
        {
            RuleFor(f => f.Name)
             .NotNull().WithMessage("*Nome é Obrigatório")
             .NotEmpty().WithMessage("*Nome é Obrigatório");

            RuleFor(f => f.Descricao)
                    .NotNull().WithMessage("*Ícone é Obrigatório")
                    .NotEmpty().WithMessage("*Ícone é Obrigatório")
                    .MinimumLength(1).WithMessage("Descrição precisa ter mais de 1 letra")
                    .MaximumLength(50).WithMessage("Descrição precisa ter menos de 50 letras");
        }
    }

}

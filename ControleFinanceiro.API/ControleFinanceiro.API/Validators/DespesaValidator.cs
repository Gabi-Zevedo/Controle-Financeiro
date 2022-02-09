using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validators
{
    public class DespesaValidator : AbstractValidator<Despesa>
    {
        public DespesaValidator()
        {
            RuleFor(d => d.CartaoId)
                .NotNull().WithMessage("*Escolha um cartão")
                .NotEmpty().WithMessage("*Escolha um cartão");

            RuleFor(d => d.Descricao)
                .NotNull().WithMessage("*Descrição Obrigatória")
                .NotEmpty().WithMessage("*Descrição Obrigatória")
                .MinimumLength(1).WithMessage("Use mais de 1 caractere")
                .MaximumLength(50).WithMessage("Use menos de 50 caractere");
            
            RuleFor(d => d.Valor)
                 .NotNull().WithMessage("*Valor Obrigatório")
                 .NotEmpty().WithMessage("*Valor Obrigatório")
                 .InclusiveBetween(0, double.MaxValue).WithMessage("Valor Inválido");

            RuleFor(d => d.MonthId)
                .NotNull().WithMessage("*Escolha um Mês")
                .NotEmpty().WithMessage("*Escolha um Mês");

            RuleFor(d => d.Year)
                .NotNull().WithMessage("*Escolha um Ano")
                .NotEmpty().WithMessage("*Escolha um Ano")
                .InclusiveBetween(2016, 2030).WithMessage("Valor Inválido");
        }
    }
}

using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validators
{
    public class CartaoValidator : AbstractValidator<Cartao>
    {
        public CartaoValidator()
        {
            RuleFor(c => c.Numero)
                .NotNull().WithMessage("*Número é Obrigatório")
                .NotEmpty().WithMessage("*Número é Obrigatório")
                .MinimumLength(1).WithMessage("Número precisa ter mais de 1 letra")
                .MaximumLength(20).WithMessage("Número precisa ter menos de 20 letras");

            RuleFor(c => c.Nome)
                .NotNull().WithMessage("*Nome é Obrigatório")
                .NotEmpty().WithMessage("*Nome é Obrigatório")
                .MinimumLength(1).WithMessage("Nome precisa ter mais de 1 letra")
                .MaximumLength(20).WithMessage("Nome precisa ter menos de 20 letras");

            RuleFor(c => c.Bandeira)
                .NotNull().WithMessage("*Bandeira é Obrigatório")
                .NotEmpty().WithMessage("*Bandeira é Obrigatório")
                .MinimumLength(1).WithMessage("Bandeira precisa ter mais de 1 letra")
                .MaximumLength(15).WithMessage("Bandeira precisa ter menos de 15 letras");

            RuleFor(c => c.Limite)
                .NotNull().WithMessage("*Limite é Obrigatório")
                .NotEmpty().WithMessage("*Limite é Obrigatório");


        }
    }
}

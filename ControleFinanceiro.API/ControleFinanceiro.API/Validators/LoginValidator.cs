using ControleFinanceiro.API.ViewModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validators
{
    public class LoginValidator : AbstractValidator<LoginViewModel>
    {
        public LoginValidator()
        {
            RuleFor(f => f.Email)
                   .NotNull().WithMessage("E-mail Obrigatório")
                   .NotEmpty().WithMessage("E-mail Obrigatório")
                   .MinimumLength(10).WithMessage("E-mail muito curto")
                   .MaximumLength(50).WithMessage("Use menos de 50 caracteres")
                   .EmailAddress().WithMessage("E-mail Inválido");

            RuleFor(f => f.Senha)
                .NotNull().WithMessage("Senha Obrigatória")
                .NotEmpty().WithMessage("Senha Obrigatória")
                .MinimumLength(6).WithMessage("Senha muito curta, use mais de 6 caracteres")
                .MaximumLength(50).WithMessage("Use menos de 50 caracteres");

        }
    }
}

using ControleFinanceiro.API.ViewModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validators
{
    public class RegistroValidator : AbstractValidator<RegistroViewModel>
    {
        public RegistroValidator()
        {
            RuleFor(u => u.UserName)
                .NotNull().WithMessage("UserName Obrigatório")
                .NotEmpty().WithMessage("UserName Obrigatório")
                .MinimumLength(4).WithMessage("UserName precisa ter 4 caracteres")
                .MaximumLength(50).WithMessage("Use menos de 50 caracteres");

            RuleFor(u => u.CPF)
                .NotNull().WithMessage("CPF Obrigatório")
                .NotEmpty().WithMessage("CPF Obrigatório")
                .MinimumLength(1).WithMessage("CPF Obrigatório")
                .MaximumLength(20).WithMessage("Use menos de 20 caracteres");

            RuleFor(u => u.Profissao)
                .NotNull().WithMessage("Profissão Obrigatório")
                .NotEmpty().WithMessage("Profissão Obrigatório")
                .MinimumLength(1).WithMessage("Profissão Obrigatório")
                .MaximumLength(30).WithMessage("Use menos de 30 caracteres");

            RuleFor(u => u.Foto)
                .NotNull().WithMessage("Foto Obrigatória")
                .NotEmpty().WithMessage("Foto Obrigatória");

            RuleFor(u => u.Email)
                .NotNull().WithMessage("E-mail Obrigatório")
                .NotEmpty().WithMessage("E-mail Obrigatório")
                .MinimumLength(10).WithMessage("E-mail muito curto")
                .MaximumLength(50).WithMessage("Use menos de 50 caracteres")
                .EmailAddress().WithMessage("E-mail Inválido") ;

            RuleFor(u => u.Senha)
                .NotNull().WithMessage("Senha Obrigatória")
                .NotEmpty().WithMessage("Senha Obrigatória")
                .MinimumLength(6).WithMessage("Senha muito curta, use mais de 6 caracteres")
                .MaximumLength(50).WithMessage("Use menos de 50 caracteres");
        }
    }
}

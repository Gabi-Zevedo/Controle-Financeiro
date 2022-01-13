using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Mapping
{
    public class MonthMap : IEntityTypeConfiguration<Month>
    {
        public void Configure(EntityTypeBuilder<Month> builder)
        {
            builder.HasKey(m => m.MonthId);
            builder.Property(m => m.Nome).IsRequired().HasMaxLength(20);
            builder.HasIndex(m => m.Nome).IsUnique();
            builder.HasMany(m => m.Despesas).WithOne(m => m.Month);
            builder.HasMany(m => m.Ganhos).WithOne(m => m.Month);

            builder.HasData(
                new Month
                {
                    MonthId = 1,
                    Nome = "Janeiro"
                },
                new Month
                {
                    MonthId = 2,
                    Nome = "Fevereiro"
                },
                new Month
                {
                    MonthId = 3,
                    Nome = "Março"
                },
                new Month
                {
                    MonthId = 4,
                    Nome = "Abril"
                },
                new Month
                {
                    MonthId = 5,
                    Nome = "Maio"
                },
                new Month
                {
                    MonthId = 6,
                    Nome = "Junho"
                },
                new Month
                {
                    MonthId = 7,
                    Nome = "Julho"
                },
                new Month
                {
                    MonthId = 8,
                    Nome = "Agosto"
                },
                new Month
                {
                    MonthId = 9,
                    Nome = "Setembro"
                },
                new Month
                {
                    MonthId = 10,
                    Nome = "Outubro"
                },
                new Month
                {
                    MonthId = 11,
                    Nome = "Novembro"
                },
                new Month
                {
                    MonthId = 12,
                    Nome = "Dezembro"
                }
                );

            builder.ToTable("Meses");
        }
    }
}

using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleFinanceiro.DAL.Mapping
{
    public class DespesaMap : IEntityTypeConfiguration<Despesa>
    {
        public void Configure(EntityTypeBuilder<Despesa> builder)
        {
            builder.HasKey(d => d.DespesaId);

            builder.Property(d => d.Descricao).IsRequired().HasMaxLength(50);

            builder.Property(d => d.Valor).IsRequired();

            builder.Property(d => d.Day).IsRequired();

            builder.Property(d => d.Year).IsRequired();

            builder.HasOne(d => d.Cartao).WithMany(d => d.Despesas).HasForeignKey(d => d.DespesaId).IsRequired();

            builder.HasOne(d => d.Categoria).WithMany(d => d.Despesas).HasForeignKey(d => d.CartaoId).IsRequired();

            builder.HasOne(d => d.Month).WithMany(d => d.Despesas).HasForeignKey(d => d.MonthId).IsRequired();

            builder.HasOne(d => d.User).WithMany(d => d.Despesas).HasForeignKey(d => d.UserId).IsRequired();
            
            builder.ToTable("Despesas");
        }
    }
}
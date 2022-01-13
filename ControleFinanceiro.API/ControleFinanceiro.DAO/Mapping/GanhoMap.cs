using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleFinanceiro.DAO.Mapping
{
    public class GanhoMap : IEntityTypeConfiguration<Ganho>
    {
        public void Configure(EntityTypeBuilder<Ganho> builder)
        {
            builder.HasKey(g=>g.GanhoId);
            builder.Property(g=>g.Descricao).IsRequired().HasMaxLength(50);
            builder.Property(g=>g.Valor).IsRequired();
            builder.Property(g=>g.Day).IsRequired();
            builder.Property(g=>g.Year).IsRequired();
            builder.HasOne(g=>g.Categoria).WithMany(g=>g.Ganhos).HasForeignKey(g=>g.CategoriaId).IsRequired();
            builder.HasOne(g=>g.Month).WithMany(g=>g.Ganhos).HasForeignKey(g=>g.MonthId).IsRequired();
            builder.HasOne(g=>g.User).WithMany(g=>g.Ganhos).HasForeignKey(g=>g.UserId).IsRequired();
            builder.ToTable("Ganhos");
        }
    }
}
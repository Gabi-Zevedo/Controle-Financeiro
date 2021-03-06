using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Mapping
{
    public class CategoriaMap : IEntityTypeConfiguration<Categoria>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Categoria> builder)
        {
            builder.HasKey(c => c.CategoriaId);
            builder.Property(c => c.Nome).IsRequired().HasMaxLength(50);
            builder.Property(c => c.Icon).IsRequired().HasMaxLength(30);

            builder.HasOne(c => c.Tipo).WithMany(c => c.Categorias).HasForeignKey(c => c.TipoId).IsRequired();
            builder.HasMany(c => c.Ganhos).WithOne(c => c.Categoria);
            builder.HasMany(c => c.Despesas).WithOne(c => c.Categoria);

            builder.ToTable("Categorias");
        }
    }
}

using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleFinanceiro.DAO.Mapping
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Id).ValueGeneratedOnAdd();
            builder.Property(u => u.CPF).IsRequired().HasMaxLength(20);
            builder.HasIndex(u => u.CPF).IsUnique();
            builder.Property(u => u.Profissao).IsRequired().HasMaxLength(30);

            builder.HasMany(u => u.Cartoes).WithOne(u => u.User).OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(u => u.Despesas).WithOne(u => u.User).OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(u => u.Ganhos).WithOne(u => u.User).OnDelete(DeleteBehavior.NoAction);
            builder.ToTable("Usuarios");
        }
    }
}
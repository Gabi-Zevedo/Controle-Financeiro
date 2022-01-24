using Microsoft.EntityFrameworkCore.Migrations;

namespace ControleFinanceiro.DAL.Migrations
{
    public partial class UpdateTamanho : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Funcoes",
                keyColumn: "Id",
                keyValue: "7b428b08-b6b2-4c24-9348-dcf17c01d9b0");

            migrationBuilder.DeleteData(
                table: "Funcoes",
                keyColumn: "Id",
                keyValue: "8345c1fb-77d4-40b3-b0b4-a245a77944a8");

            migrationBuilder.AlterColumn<string>(
                name: "Icon",
                table: "Categorias",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(15)",
                oldMaxLength: 15);

            migrationBuilder.InsertData(
                table: "Funcoes",
                columns: new[] { "Id", "ConcurrencyStamp", "Descricao", "Name", "NormalizedName" },
                values: new object[] { "ddea4cab-e322-41f7-9921-96d1b4a49d40", "e85e0ee2-e393-4e09-86cc-75036b553695", "Administrador do Sistema", "Administrador", "ADMINISTRADOR" });

            migrationBuilder.InsertData(
                table: "Funcoes",
                columns: new[] { "Id", "ConcurrencyStamp", "Descricao", "Name", "NormalizedName" },
                values: new object[] { "890062c9-75b1-409c-8582-5c137bad35c1", "8058c78d-58da-4004-a537-072f20f9fc62", "Usuário do Sistema", "Usuario", "USUARIO" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Funcoes",
                keyColumn: "Id",
                keyValue: "890062c9-75b1-409c-8582-5c137bad35c1");

            migrationBuilder.DeleteData(
                table: "Funcoes",
                keyColumn: "Id",
                keyValue: "ddea4cab-e322-41f7-9921-96d1b4a49d40");

            migrationBuilder.AlterColumn<string>(
                name: "Icon",
                table: "Categorias",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.InsertData(
                table: "Funcoes",
                columns: new[] { "Id", "ConcurrencyStamp", "Descricao", "Name", "NormalizedName" },
                values: new object[] { "8345c1fb-77d4-40b3-b0b4-a245a77944a8", "c584321e-94e7-4a52-82d3-587a81758ed9", "Administrador do Sistema", "Administrador", "ADMINISTRADOR" });

            migrationBuilder.InsertData(
                table: "Funcoes",
                columns: new[] { "Id", "ConcurrencyStamp", "Descricao", "Name", "NormalizedName" },
                values: new object[] { "7b428b08-b6b2-4c24-9348-dcf17c01d9b0", "91a40185-30c6-4d45-84c0-24a73af32c01", "Usuário do Sistema", "Usuario", "USUARIO" });
        }
    }
}

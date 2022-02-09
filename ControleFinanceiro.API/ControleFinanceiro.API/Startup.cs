using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ControleFinanceiro.DAL.Interfaces;
using ControleFinanceiro.DAL.Repositories;
using FluentValidation;
using ControleFinanceiro.API.Validators;
using FluentValidation.AspNetCore;
using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.API.Extensions;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace ControleFinanceiro.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Context>(options => options.UseSqlServer(Configuration.GetConnectionString("ConexaoDB")));

            services.AddIdentity<User, Funcao>().AddEntityFrameworkStores<Context>();
            services.UserPasswordConfiguration();

            services.AddCors();

            services.AddSpaStaticFiles(dir => dir.RootPath = "ControleFinanceiro-UI");



            var key = Encoding.ASCII.GetBytes(Settings.Key);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false

                };
            });



            services.AddControllers()
                .AddFluentValidation()
                .AddJsonOptions(options => options.JsonSerializerOptions.IgnoreNullValues = true)
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                })
                ;

            services.AddScoped<ICategoriaRepository, CategoriaRepository>();
            services.AddScoped<ITipoRepository, TipoRepository>();
            services.AddScoped<IFuncaoRepository, FuncaoRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICartaoRepository, CartaoRepository>();
            services.AddScoped<IDespesaRepository, DespesaRepository>();
            services.AddScoped<IMonthRepository, MonthRepository>();

            services.AddTransient<IValidator<Categoria>, CategoriaValidator>();
            services.AddTransient<IValidator<FuncaoViewModel>, FuncoesValidator>();
            services.AddTransient<IValidator<RegistroViewModel>, RegistroValidator>();
            services.AddTransient<IValidator<LoginViewModel>, LoginValidator>();
            services.AddTransient<IValidator<Cartao>, CartaoValidator>();
            services.AddTransient<IValidator<Despesa>, DespesaValidator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Path.Combine(Directory.GetCurrentDirectory(), "ControleFinanceiro-UI");

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer($"http://localhost:4200/");
                }
            });
        }
    }
}

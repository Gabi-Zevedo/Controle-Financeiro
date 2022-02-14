import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartao } from 'src/app/models/Cartao';
import { Categoria } from 'src/app/models/categoria';
import { Month } from 'src/app/models/Month';
import { CartoesService } from 'src/app/services/cartoes.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { DespesasService } from 'src/app/services/despesas.service';
import { MonthsService } from 'src/app/services/months.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-update-despesas',
  templateUrl: './update-despesas.component.html',
  styleUrls: ['../list-despesas/list-despesas.component.css'],
})
export class UpdateDespesasComponent implements OnInit {
  form: FormGroup;
  cartoes: Cartao[];
  categorias: Categoria[];
  months: Month[];
  userId: any = localStorage.getItem('UserId');
  erros: string[];
  valorDespesa: number;
  despesaId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesasService,
    private cartoesService: CartoesService,
    private categoriasService: CategoriasService,
    private monthsService: MonthsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.despesaId = this.route.snapshot.params.id;
    this.CarregarDados();
  }

  CarregarDados() {
    this.cartoesService.GetByUserId(this.userId).subscribe((resultado) => {
      this.cartoes = resultado;
    });

    this.monthsService.GetAll().subscribe((resultado) => {
      this.months = resultado;
    });

    this.categoriasService
      .FiltrarCategoriasDespesas()
      .subscribe((resultado) => {
        this.categorias = resultado;
      });

      this.despesaService.GetById(this.despesaId).subscribe(resultado => {
        this.valorDespesa = resultado.valor;
        this.form = new FormGroup({
          despesaId: new FormControl(resultado.despesaId),
          cartaoId: new FormControl(resultado.cartaoId, [Validators.required]),
          descricao: new FormControl(resultado.descricao, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          categoriaId: new FormControl(resultado.categoriaId, [Validators.required]),
          valor: new FormControl(resultado.valor, [Validators.required]),
          day: new FormControl(resultado.day, [Validators.required]),
          monthId: new FormControl(resultado.monthId, [Validators.required]),
          year: new FormControl(resultado.year, [Validators.required]),
          userId: new FormControl(this.userId),
        });
      })
  }


  get f() {
    return this.form.controls;
  }

  retornar(): void {
    this.router.navigate(['despesas/listagem']);
  }

  updateDespesa(){
    const despesa = this.form.value;
    this.erros = [];
    this.despesaService.UpdateDespesa(this.despesaId, despesa)
      .subscribe((resultado) => {
        this.router.navigate(['despesas/listagem']);
        this.snackBar.open(resultado.message, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      }
    );

  }
}

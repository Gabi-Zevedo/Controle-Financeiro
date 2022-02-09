import { MatSnackBar } from '@angular/material/snack-bar';
import { MonthsService } from './../../../services/months.service';
import { CategoriasService } from './../../../services/categorias.service';
import { CartoesService } from './../../../services/cartoes.service';
import { Month } from './../../../models/Month';
import { Categoria } from './../../../models/categoria';
import { Cartao } from 'src/app/models/Cartao';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DespesasService } from './../../../services/despesas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-despesas',
  templateUrl: './add-despesas.component.html',
  styleUrls: ['../list-despesas/list-despesas.component.css'],
})
export class AddDespesasComponent implements OnInit {
  form: FormGroup;
  cartoes: Cartao[];
  categorias: Categoria[];
  months: Month[];
  userId: any = localStorage.getItem('UserId');
  erros: string[];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private despesaService: DespesasService,
    private cartoesService: CartoesService,
    private categoriasService: CategoriasService,
    private monthsService: MonthsService
  ) {}

  ngOnInit(): void {
    this.CarregarCartoes();
    this.CarregarCategorias();
    this.CarregarMeses();
    this.validation();
    this.erros = [];
  }

  CarregarCartoes() {
    this.cartoesService.GetByUserId(this.userId).subscribe((resultado) => {
      this.cartoes = resultado;
    });
  }

  CarregarCategorias() {
    this.categoriasService
      .FiltrarCategoriasDespesas()
      .subscribe((resultado) => {
        this.categorias = resultado;
      });
  }

  CarregarMeses() {
    this.monthsService.GetAll().subscribe((resultado) => {
      this.months = resultado;
    });
  }

  private validation(): void {
    this.form = new FormGroup({
      cartaoId: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      categoriaId: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      day: new FormControl(null, [Validators.required]),
      monthId: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      userId: new FormControl(this.userId),
    });
  }

  get f() {
    return this.form.controls;
  }

  retornar(): void {
    this.router.navigate(['despesas/listagem']);
  }

  submitDespesa() {
    const despesa = this.form.value;

    this.despesaService.AddDespesa(despesa).subscribe(resultado => {
      this.retornar();
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
      };
    }
  );
}
}

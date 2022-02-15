import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Month } from 'src/app/models/Month';
import { CategoriasService } from 'src/app/services/categorias.service';
import { GanhosService } from 'src/app/services/ganhos.service';
import { MonthsService } from 'src/app/services/months.service';

@Component({
  selector: 'app-add-ganhos',
  templateUrl: './add-ganhos.component.html',
  styleUrls: ['../list-ganhos/list-ganhos.component.css']
})
export class AddGanhosComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[];
  months: Month[];
  userId: any = localStorage.getItem('UserId');
  erros: string[];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private ganhoService: GanhosService,
    private categoriasService: CategoriasService,
    private monthsService: MonthsService
  ) {}

  ngOnInit(): void {
    this.CarregarCategorias();
    this.CarregarMeses();
    this.validation();
    this.erros = [];
  }


  CarregarCategorias() {
    this.categoriasService
      .FiltrarCategoriasGanhos()
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
    this.router.navigate(['ganhos/listagem']);
  }

  submitGanho() {
    const ganho = this.form.value;
    this.erros = [];
    this.ganhoService.AddGanho(ganho).subscribe(resultado => {
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

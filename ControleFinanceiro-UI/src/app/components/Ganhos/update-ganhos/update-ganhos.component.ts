import { GanhosService } from './../../../services/ganhos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Month } from 'src/app/models/Month';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MonthsService } from 'src/app/services/months.service';

@Component({
  selector: 'app-update-ganhos',
  templateUrl: './update-ganhos.component.html',
  styleUrls: ['../list-ganhos/list-ganhos.component.css']
})
export class UpdateGanhosComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[];
  months: Month[];
  userId: any = localStorage.getItem('UserId');
  erros: string[];
  valorGanho: number;
  ganhoId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ganhoService: GanhosService,
    private categoriasService: CategoriasService,
    private monthsService: MonthsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.ganhoId = this.route.snapshot.params.id;
    this.CarregarDados();
  }

  CarregarDados() {

    this.monthsService.GetAll().subscribe((resultado) => {
      this.months = resultado;
    });

    this.categoriasService
      .FiltrarCategoriasGanhos()
      .subscribe((resultado) => {
        this.categorias = resultado;
      });

      this.ganhoService.GetById(this.ganhoId).subscribe(resultado => {
        this.valorGanho = resultado.valor;
        this.form = new FormGroup({
          ganhoId: new FormControl(resultado.ganhoId),
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
    this.router.navigate(['ganhos/listagem']);
  }

  updateGanho(){
    const ganho = this.form.value;
    this.erros = [];
    this.ganhoService.UpdateGanho(this.ganhoId, ganho)
      .subscribe((resultado) => {
        this.router.navigate(['ganhos/listagem']);
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


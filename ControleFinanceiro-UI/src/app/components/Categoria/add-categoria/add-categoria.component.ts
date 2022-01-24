import { CategoriasService } from './../../../services/categorias.service';
import { TiposService } from './../../../services/tipos.service';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['../list-categorias/list-categorias.component.css'],
})
export class AddCategoriaComponent implements OnInit {
  form!: FormGroup;
  tipos: Tipo[];
  erros: string[];

  constructor(
    private tiposService: TiposService,
    private categoriasService: CategoriasService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.carregarTipos();
    this.validation();
  }

  carregarTipos(): void {
    this.tiposService
      .GetAll()
      .subscribe((resultado) => (this.tipos = resultado));
  }

  private validation(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      icon: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      tipoId: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submitCategoria(): void {
    const categoria = this.form.value;
    this.erros = [];
    this.categoriasService.AddCategoria(categoria).subscribe(
      (resultado) => {
        this.router.navigate(['categorias/listagem']);
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

  retornar(): void {
    this.router.navigate(['categorias/listagem']);
  }
}

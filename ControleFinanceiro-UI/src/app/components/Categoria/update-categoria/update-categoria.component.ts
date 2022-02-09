import { Categoria } from '../../../models/categoria';
import { TiposService } from './../../../services/tipos.service';
import { CategoriasService } from './../../../services/categorias.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['../list-categorias/list-categorias.component.css'],
})
export class UpdateCategoriaComponent implements OnInit {
  categoriaName: string;
  categoriaId: number;
  categoria: Observable<Categoria>;
  tipos: Tipo[];
  form!: FormGroup;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private tiposService: TiposService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.categoriaId = this.route.snapshot.params.id;
    this.carregarTipos();
    this.carregarCategorias(this.categoriaId);
  }

  carregarTipos(): void {
    this.tiposService
      .GetAll()
      .subscribe((resultado) => (this.tipos = resultado));
  }

  carregarCategorias(id: number): void {
    this.categoriasService.GetCategoriaById(id).subscribe((resultado) => {
      this.categoriaName = resultado.nome;
      this.form = new FormGroup({
        categoriaId: new FormControl(resultado.categoriaId),
        nome: new FormControl(resultado.nome, [Validators.required, Validators.maxLength(50)]),
        icon: new FormControl(resultado.icon, [Validators.required, Validators.maxLength(30)]),
        tipoId: new FormControl(resultado.tipoId, [Validators.required]),
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  retornar(): void {
    this.router.navigate(['categorias/listagem']);
  }

  submitCategoria(): void {
    const categoria = this.form.value;
    this.erros = [];
    this.categoriasService
      .UpdateCategoria(this.categoriaId, categoria)
      .subscribe((resultado) => {
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
}

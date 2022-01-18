import { Categoria } from './../../../models/categoria';
import { TiposService } from './../../../services/tipos.service';
import { CategoriasService } from './../../../services/categorias.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private tiposService: TiposService
  ) {}

  ngOnInit(): void {
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
        nome: new FormControl(resultado.nome),
        icon: new FormControl(resultado.icon),
        tipoId: new FormControl(resultado.tipoId),
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
    this.categoriasService
      .UpdateCategoria(this.categoriaId, categoria)
      .subscribe((resultado) => this.router.navigate(['categorias/listagem']));
  }
}

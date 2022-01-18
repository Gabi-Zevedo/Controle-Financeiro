import { CategoriasService } from './../../../services/categorias.service';
import { TiposService } from './../../../services/tipos.service';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['../list-categorias/list-categorias.component.css'],
})
export class AddCategoriaComponent implements OnInit {
  form!: FormGroup;
  tipos: Tipo[];

  constructor(
    private tiposService: TiposService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      nome: new FormControl(null),
      icon: new FormControl(null),
      tipoId: new FormControl(null),
    });
  }

  get f() {
    return this.form.controls;
  }

  submitCategoria(): void {
    const categoria = this.form.value;

    this.categoriasService.AddCategoria(categoria).subscribe(resultado=> {
      this.router.navigate(['categorias/listagem']);
    })
  }

  retornar():void{
    this.router.navigate(['categorias/listagem']);
  }
}

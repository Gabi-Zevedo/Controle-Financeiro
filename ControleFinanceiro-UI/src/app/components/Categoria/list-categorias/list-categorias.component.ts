import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-List-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css'],
})
export class ListCategoriasComponent implements OnInit {
  categorias = new MatTableDataSource<any>();
  displayedColums: string[];
  autoCompleteInput = new FormControl();
  opcoesDeBusca: string[] = [];
  nomesCategorias: Observable<string[]>;

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.CarregarCategorias();

    this.displayedColums = this.ExibirColunas();
    this.ExibirFiltro();

  }

  CarregarCategorias(): void {
    this.categoriasService.GetAll().subscribe((resultado) => {
      resultado.forEach((categoria) => this.opcoesDeBusca.push(categoria.nome));

        this.categorias.data = resultado;
    });
  }


  ExibirFiltro(){
    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
      );
  }

  FiltrarNomes(termo: string): string[] {
    if (termo.trim().length >= 4) {
      this.categoriasService
        .FiltrarCategorias(termo)
        .subscribe((resultado) => (this.categorias.data = resultado));
    } else {
      if (termo === '') {
        this.categoriasService
        .GetAll()
        .subscribe((resultado) => (this.categorias.data = resultado));
      }
    }
    return this.opcoesDeBusca.filter((categoria) =>
      categoria.toLowerCase().includes(termo.toLowerCase())
    );
  }

  ExibirColunas(): string[] {
    return ['nome', 'icone', 'tipo', 'acoes'];
  }

  OpenDialog(id: number, nome: string): void {
    this.dialog
      .open(DialogDeleteCategoriasComponent, {
        data: {
          categoriaId: id,
          nome: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.categoriasService.GetAll().subscribe((dados) => {
            this.categorias.data = dados;
          });
          this.displayedColums = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-delete-categorias',
  templateUrl: 'dialog-delete-categorias.html',
  styleUrls: ['./list-categorias.component.css'],
})
export class DialogDeleteCategoriasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriasService: CategoriasService
  ) {}

  DeleteCategoria(id: number): void {
    this.categoriasService.DeleteCategoria(id).subscribe((resultado) => {});
  }
}

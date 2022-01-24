import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-List-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css'],
})
export class ListCategoriasComponent implements OnInit {
  categorias = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesDeBusca: string[] = [];
  nomesCategorias: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.CarregarCategorias();

    this.displayedColumns = this.ExibirColunas();
    this.ExibirFiltro();
  }

  CarregarCategorias(): void {
    this.categoriasService.GetAll().subscribe((resultado) => {
      resultado.forEach((categoria) => this.opcoesDeBusca.push(categoria.nome));

      this.categorias.data = resultado;
      this.categorias.paginator = this.paginator;
      this.categorias.sort = this.sort;
    });
  }

  ExibirFiltro() {
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
    return ['nome', 'icon', 'tipo', 'acoes'];
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
          this.displayedColumns = this.ExibirColunas();
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
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) {}

  DeleteCategoria(id: number): void {
    this.categoriasService.DeleteCategoria(id).subscribe((resultado) => {
      this.snackBar.open(resultado.message, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}

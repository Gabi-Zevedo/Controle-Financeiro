import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-List-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css'],
})
export class ListCategoriasComponent implements OnInit {
  categorias = new MatTableDataSource<any>();
  displayedColums: string[];

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.categoriasService
      .GetAll()
      .subscribe((resultado) => (this.categorias.data = resultado));

    this.displayedColums = this.ExibirColunas();
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
  templateUrl: 'dialog-delete-categorias.html'})

export class DialogDeleteCategoriasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriasService: CategoriasService
  ) {}

  DeleteCategoria(id: number): void {
    this.categoriasService.DeleteCategoria(id).subscribe((resultado) => {});
  }
}

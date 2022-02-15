import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { GanhosService } from 'src/app/services/ganhos.service';

@Component({
  selector: 'app-list-ganhos',
  templateUrl: './list-ganhos.component.html',
  styleUrls: ['./list-ganhos.component.css']
})
export class ListGanhosComponent implements OnInit {
  ganhos = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesDeBusca: string[] = [];
  descricaoGanhos: Observable<string[]>;
  userId: any = localStorage.getItem('UserId');

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  constructor(
    private ganhosService: GanhosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.Carregarganhos();
    this.displayedColumns = this.ExibirColunas();
    this.ExibirFiltro();
  }

  Carregarganhos() {
    this.ganhosService.GetByUserId(this.userId).subscribe((resultado) => {
      resultado.forEach((ganho) =>
        this.opcoesDeBusca.push(ganho.descricao)
      );
      this.ganhos.data = resultado;
      this.ganhos.sort = this.sort;
      this.ganhos.paginator = this.paginator;
    });
  }

  ExibirColunas(): string[] {
    return ['descricao','valor','categoriaId','data','acoes'];
  }

  OpenDialog(id: number, descricao: string) {
    this.dialog
      .open(DialogDeleteGanhosComponent, {
        data: {
          ganhoId: id,
          descricao: descricao,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.ganhosService.GetByUserId(this.userId).subscribe((dados) => {
            this.ganhos.data = dados;
            this.ganhos.paginator = this.paginator;
          });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }

  ExibirFiltro() {
    this.descricaoGanhos = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  FiltrarNomes(termo: string): string[] {
    if (termo.trim().length >= 4) {
      this.ganhosService
        .FiltrarGanho(termo)
        .subscribe((resultado) => (this.ganhos.data = resultado));
    } else {
      if (termo === '') {
        this.ganhosService
          .GetByUserId(this.userId)
          .subscribe((resultado) => (this.ganhos.data = resultado));
      }
    }
    return this.opcoesDeBusca.filter((cartao) =>
      cartao.toLowerCase().includes(termo.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-dialog-delete-ganhos',
  templateUrl: 'dialog-delete-ganhos.html',
  styleUrls: ['./list-ganhos.component.css'],
})
export class DialogDeleteGanhosComponent {
  /**
   *
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ganhoService: GanhosService,
    private snackBar: MatSnackBar
  ) {}

  DeleteGanho(id: number) {
    this.ganhoService.DeleteGanho(id).subscribe((resultado) => {
      this.snackBar.open(resultado.message, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}

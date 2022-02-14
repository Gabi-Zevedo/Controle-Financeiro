import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DespesasService } from './../../../services/despesas.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-list-despesas',
  templateUrl: './list-despesas.component.html',
  styleUrls: ['./list-despesas.component.css'],
})
export class ListDespesasComponent implements OnInit {
  despesas = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesDeBusca: string[] = [];
  descricaoDespesas: Observable<string[]>;
  userId: any = localStorage.getItem('UserId');

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.CarregarDespesas();
    this.displayedColumns = this.ExibirColunas();
    this.ExibirFiltro();
  }

  CarregarDespesas() {
    this.despesasService.GetByUserId(this.userId).subscribe((resultado) => {
      resultado.forEach((despesa) =>
        this.opcoesDeBusca.push(despesa.descricao)
      );
      this.despesas.data = resultado;
      this.despesas.sort = this.sort;
      this.despesas.paginator = this.paginator;
    });
  }

  ExibirColunas(): string[] {
    return ['descricao','valor','cartaoId','categoriaId','data','acoes'];
  }

  OpenDialog(id: number, descricao: string) {
    this.dialog
      .open(DialogDeleteDespesasComponent, {
        data: {
          despesaId: id,
          descricao: descricao,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.despesasService.GetByUserId(this.userId).subscribe((dados) => {
            this.despesas.data = dados;
            this.despesas.paginator = this.paginator;
          });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }

  ExibirFiltro() {
    this.descricaoDespesas = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  FiltrarNomes(termo: string): string[] {
    if (termo.trim().length >= 4) {
      this.despesasService
        .FiltrarDespesa(termo)
        .subscribe((resultado) => (this.despesas.data = resultado));
    } else {
      if (termo === '') {
        this.despesasService
          .GetByUserId(this.userId)
          .subscribe((resultado) => (this.despesas.data = resultado));
      }
    }
    return this.opcoesDeBusca.filter((cartao) =>
      cartao.toLowerCase().includes(termo.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-dialog-delete-despesa',
  templateUrl: 'dialog-delete-despesas.html',
  styleUrls: ['./list-despesas.component.css'],
})
export class DialogDeleteDespesasComponent {
  /**
   *
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private despesasService: DespesasService,
    private snackBar: MatSnackBar
  ) {}

  DeleteDespesa(id: number) {
    this.despesasService.DeleteDespesa(id).subscribe((resultado) => {
      this.snackBar.open(resultado.message, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}

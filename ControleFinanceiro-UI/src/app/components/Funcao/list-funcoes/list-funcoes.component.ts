import { FuncoesService } from './../../../services/funcoes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-funcoes',
  templateUrl: './list-funcoes.component.html',
  styleUrls: ['./list-funcoes.component.css'],
})
export class ListFuncoesComponent implements OnInit {
  funcoes = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesDeBusca: string[] = [];
  nomesFuncoes: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private funcoesService: FuncoesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.CarregarFuncoes();
    this.displayedColumns = this.ExibirColunas();
    this.ExibirFiltro();
  }

  CarregarFuncoes(): void {
    this.funcoesService.GetAll().subscribe((resultado) => {
      resultado.forEach((funcao) => this.opcoesDeBusca.push(funcao.name));
      this.funcoes.data = resultado;
      this.funcoes.sort = this.sort;
      this.funcoes.paginator = this.paginator;
    });
  }

  ExibirColunas(): string[] {
    return ['name', 'descricao', 'acoes'];
  }

  ExibirFiltro(): void {
    this.nomesFuncoes = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  FiltrarNomes(termo: string): string[] {
    if (termo.trim().length >= 4) {
      this.funcoesService
        .FiltrarFuncao(termo)
        .subscribe((resultado) => (this.funcoes.data = resultado));
    } else {
      if (termo === '') {
        this.funcoesService
          .GetAll()
          .subscribe((resultado) => (this.funcoes.data = resultado));
      }
    }
    return this.opcoesDeBusca.filter((categoria) =>
      categoria.toLowerCase().includes(termo.toLowerCase())
    );
  }

  OpenDialog(id: string, nome: string): void {
    this.dialog
      .open(DialogDeleteFuncoesComponent, {
        data: {
          funcaoId: id,
          name: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.funcoesService.GetAll().subscribe((dados) => {
            this.funcoes.data = dados;
          });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-delete-funcoes',
  templateUrl: 'dialog-delete-funcoes.html',
  styleUrls: ['./list-funcoes.component.css'],
})
export class DialogDeleteFuncoesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcoesService: FuncoesService,
    private snackBar: MatSnackBar
  ) {}

  DeleteFuncao(id: string): void {
    this.funcoesService.DeleteFuncao(id).subscribe((resultado) => {
      this.snackBar.open(resultado.message, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}

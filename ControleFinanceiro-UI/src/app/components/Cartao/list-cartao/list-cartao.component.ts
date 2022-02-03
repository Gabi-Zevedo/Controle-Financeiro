import { DialogDeleteCategoriasComponent } from './../../Categoria/list-categorias/list-categorias.component';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartoesService } from './../../../services/cartoes.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-cartao',
  templateUrl: './list-cartao.component.html',
  styleUrls: ['./list-cartao.component.css'],
})
export class ListCartaoComponent implements OnInit {
  cartoes = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesDeBusca: string[] = [];
  nomesCartoes: Observable<string[]>;
  userId: any = localStorage.getItem('UserId');

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  constructor(
    private cartoesService: CartoesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.CarregarCartoes();
    this.displayedColumns = this.ExibirColunas();
    this.ExibirFiltro();
  }

  CarregarCartoes() {
    this.cartoesService.GetByUserId(this.userId).subscribe((resultado) => {
      resultado.forEach((cartao) => this.opcoesDeBusca.push(cartao.nome));
      this.cartoes.data = resultado;
      this.cartoes.sort = this.sort;
      this.cartoes.paginator = this.paginator;
    });
  }

  ExibirColunas(): string[] {
    return ['nome', 'bandeira', 'numero', 'limite', 'acoes'];
  }

  ExibirFiltro() {
    this.nomesCartoes = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  FiltrarNomes(termo: string): string[] {
    if (termo.trim().length >= 4) {
      this.cartoesService
        .FiltrarCartao(termo)
        .subscribe((resultado) => (this.cartoes.data = resultado));
    } else {
      if (termo === '') {
        this.cartoesService
          .GetByUserId(this.userId)
          .subscribe((resultado) => (this.cartoes.data = resultado));
      }
    }
    return this.opcoesDeBusca.filter((cartao) =>
      cartao.toLowerCase().includes(termo.toLowerCase())
    );
  }

  OpenDialog(id: number, nome: string) {
    this.dialog
      .open(DialogDeleteCartaoComponent, {
        data: {
          cartaoId: id,
          name: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.cartoesService
            .GetByUserId(this.userId)
            .subscribe((dados) => (this.cartoes.data = dados));
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-delete-cartao',
  templateUrl: 'dialog-delete-cartao.html',
  styleUrls: ['./list-cartao.component.css'],
})
export class DialogDeleteCartaoComponent {
  /**
   *
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartoesService: CartoesService,
    private snackBar: MatSnackBar
  ) {}

  DeleteCartao(id: number) {
    this.cartoesService.DeleteCartao(id).subscribe((resultado) => {
      this.snackBar.open(resultado.message, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}

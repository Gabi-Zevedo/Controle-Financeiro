import { MatDialog } from '@angular/material/dialog';
import { DespesasService } from './../../../services/despesas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

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

  ngOnInit(): void {}

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
    return ['descricao', 'valor', 'month', 'year', 'acoes'];
  }

  OpenDialog(){
    
  }
}

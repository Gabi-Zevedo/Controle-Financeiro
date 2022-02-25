
import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  qtdCartoes: number;
  ganhoTotal: number;
  despesaTotal: number;
  saldo: number;
  atualYear: number = new Date().getFullYear();
  initalYear: number = this.atualYear - 10;
  years: number[];


  userId: any = localStorage.getItem('UserId');

  dados: ChartDataSets[];
  labels: Label[];
  options = {
    responsive: true,
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  };
  plugins = [];
  tipo: ChartType = "line";

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.CarregarDadosPagina();
    this.CarregarDadosGrafico();
  }

  CarregarDadosPagina() {
    this.dashboardService
      .GetDadosCardsDashboard(this.userId)
      .subscribe((resultado) => {
        this.qtdCartoes = resultado.qtdCartoes;
        this.ganhoTotal = resultado.ganhoTotal;
        this.despesaTotal = resultado.despesaTotal;
        this.saldo = resultado.saldo;
      });

    this.years = this.CarregarYears(this.initalYear, this.atualYear);


  }

  CarregarYears(anoInicial: number, anoAtual: number): number[] {
    const years = [];
    while (anoInicial <= anoAtual) {
      years.push(anoInicial);
      anoInicial = anoInicial + 1;
    }
    return years;
  }

  GetMonths(monthsData: any): string[]{
    const months =[];
    let indice = 0;
    const qtdMonths = monthsData.length;

    while (indice < qtdMonths) {
      months.push(monthsData[indice].nome);
      indice = indice + 1;
    }
    return months;
  }

  CarregarDadosGrafico(){
    this.dashboardService
    .GetYearDataByUserId(this.userId, this.atualYear)
    .subscribe((resultado) => {

      this.labels = this.GetMonths(resultado.months);

      this.dados = [
        {
          data: this.GetValoresGanhos(resultado.months, resultado.ganhos),
          label: 'Ganho de R$',
          fill: false,
          borderColor: '#27ae60',
          backgroundColor: '#27ae60',
          pointBackgroundColor: '#27ae60',
          pointHoverBackgroundColor: '#27ae60',
          pointHoverBorderColor: '#27ae60',
        },
        {
          data: this.GetValoresDespesas(resultado.months, resultado.despesas),
          label: 'Despesa de R$',
          fill: false,
          borderColor: '#c0392b',
          backgroundColor: '#c0392b',
          pointBackgroundColor: '#c0392b',
          pointHoverBackgroundColor: '#c0392b',
          pointHoverBorderColor: '#c0392b',
        },
      ];

      console.log(this.dados);

    });
  }

  GetValoresGanhos(monthsData: any, ganhosData: any): number[]{
    const valores = [];
    let indiceMonths = 0;
    let indiceGanhos = 0;
    const qtdMonths = monthsData.length;
    const qtdGanhos = ganhosData.length;

    while (indiceMonths <= qtdMonths - 1) {
      if (indiceGanhos <= qtdGanhos - 1) {
        if (ganhosData[indiceGanhos].monthId === monthsData[indiceMonths].monthId) {
          valores.push(ganhosData[indiceGanhos].valores);
          indiceGanhos = indiceGanhos +1;
          indiceMonths = indiceMonths +1;
        }

        else{
          valores.push(0);
          indiceMonths = indiceMonths + 1;
        }
      }

      else{
        valores.push(0);
        indiceMonths = indiceMonths + 1;
      }
    }
    return valores;
  }

  GetValoresDespesas(monthsData: any, despesasData: any){
    const valores = [];
    let indiceMonths = 0;
    let indiceDespesas = 0;
    const qtdMonths = monthsData.length;
    const qtdDespesas = despesasData.length;

    while (indiceMonths <= qtdMonths - 1) {
      if (indiceDespesas <= qtdDespesas - 1) {
        if (despesasData[indiceDespesas].monthId === monthsData[indiceMonths].monthId) {
          valores.push(despesasData[indiceDespesas].valores);
          indiceDespesas++;
          indiceMonths++;
        }

        else{
          valores.push(0);
          indiceMonths++;
        }
      }

      else{
        valores.push(0);
        indiceMonths++;
      }
    }
    return valores;
  }

  isPositivo(): boolean {
    return this.saldo >= 0;
  }

  CarregarGrafico(selectedYear: number){
    this.dashboardService
      .GetYearDataByUserId(this.userId, selectedYear)
      .subscribe((resultado) => {

        this.labels = this.GetMonths(resultado.months);

        this.dados = [
          {
            data: this.GetValoresGanhos(resultado.months, resultado.ganhos),
            label: 'Ganho de R$',
            fill: false,
            borderColor: '#27ae60',
            backgroundColor: '#27ae60',
            pointBackgroundColor: '#27ae60',
            pointHoverBackgroundColor: '#27ae60',
            pointHoverBorderColor: '#27ae60',
          },
          {
            data: this.GetValoresDespesas(resultado.months, resultado.despesas),
            label: 'Despesa de R$',
            fill: false,
            borderColor: '#c0392b',
            backgroundColor: '#c0392b',
            pointBackgroundColor: '#c0392b',
            pointHoverBackgroundColor: '#c0392b',
            pointHoverBorderColor: '#c0392b',
          },
        ];
      });
  }
}

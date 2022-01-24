import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcao } from './../../../models/Funcao';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncoesService } from 'src/app/services/funcoes.service';

@Component({
  selector: 'app-update-funcoes',
  templateUrl: './update-funcoes.component.html',
  styleUrls: ['../list-funcoes/list-funcoes.component.css']
})
export class UpdateFuncoesComponent implements OnInit {
  funcaoName: string;
  funcaoId: string;
  funcao: Observable<Funcao>;
  form!: FormGroup;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private funcoesService: FuncoesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.funcaoId = this.route.snapshot.params.id;
    this.carregarFuncoes(this.funcaoId);
  }

  carregarFuncoes(id: string): void {
    this.funcoesService.GetById(id).subscribe((resultado) => {
      this.funcaoName = resultado.name;
      this.form = new FormGroup({
        id: new FormControl(resultado.id),
        name: new FormControl(resultado.name, [Validators.required]),
        descricao: new FormControl(resultado.descricao, [Validators.required, Validators.maxLength(50)]),
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  retornar(): void {
    this.router.navigate(['funcoes/listagem']);
  }

  submitFuncao(): void {
    const funcao = this.form.value;
    this.erros = [];
    this.funcoesService
      .UpdateFuncao(this.funcaoId, funcao)
      .subscribe((resultado) => {
        this.router.navigate(['funcoes/listagem']);
        this.snackBar.open(resultado.message, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      }
    );
  }
}

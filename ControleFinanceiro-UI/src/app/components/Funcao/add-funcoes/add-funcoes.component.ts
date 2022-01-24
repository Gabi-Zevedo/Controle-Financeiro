import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/services/funcoes.service';

@Component({
  selector: 'app-add-funcoes',
  templateUrl: './add-funcoes.component.html',
  styleUrls: ['../list-funcoes/list-funcoes.component.css']
})
export class AddFuncoesComponent implements OnInit {
  form!: FormGroup;
  erros: string[];

  constructor(
    private funcoesService: FuncoesService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.validation();
  }


  private validation(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submitFuncao(): void {
    const funcao = this.form.value;
    this.erros = [];
    this.funcoesService.AddFuncao(funcao).subscribe(
      (resultado) => {

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
        };
      }
    );
  }

  retornar(): void {
    this.router.navigate(['funcoes/listagem']);
  }
}



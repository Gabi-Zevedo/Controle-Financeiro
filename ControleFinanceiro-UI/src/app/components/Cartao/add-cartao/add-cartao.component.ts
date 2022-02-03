import { CartoesService } from './../../../services/cartoes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-cartao',
  templateUrl: './add-cartao.component.html',
  styleUrls: ['../list-cartao/list-cartao.component.css']
})
export class AddCartaoComponent implements OnInit {
  form!: FormGroup;
  erros: string[];
  userId = localStorage.getItem('UserId');

  constructor(
    private cartoesService: CartoesService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];

    this.validation();
  }


  private validation(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      bandeira: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      numero: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      limite: new FormControl(null, [Validators.required]),
      userId: new FormControl(this.userId),
    });
  }

  get f() {
    return this.form.controls;
  }



  retornar(): void {
    this.router.navigate(['categorias/listagem']);
  }

  submitCartao(){

    const cartao = this.form.value;
    this.erros = [];
    this.cartoesService.AddCartao(cartao).subscribe(
      (resultado) => {

        this.router.navigate(['cartoes/listagem']);
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
}

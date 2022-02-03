import { CartoesService } from './../../../services/cartoes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cartao } from 'src/app/models/Cartao';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-cartao',
  templateUrl: './update-cartao.component.html',
  styleUrls: ['../list-cartao/list-cartao.component.css'],
})
export class UpdateCartaoComponent implements OnInit {
  cartaoName: string;
  cartaoId: number;
  cartao: Observable<Cartao>;
  form!: FormGroup;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartoesService: CartoesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.cartaoId = this.route.snapshot.params.id;
    this.carregarCartao(this.cartaoId);
  }

  carregarCartao(id: number) {
    this.cartoesService.GetById(id).subscribe((resultado) => {
      this.cartaoName = resultado.nome;
      this.form = new FormGroup({
      cartaoId: new FormControl(resultado.cartaoId),
      nome: new FormControl(resultado.nome, [Validators.required, Validators.maxLength(20)]),
      bandeira: new FormControl(resultado.bandeira, [Validators.required, Validators.maxLength(15)]),
      numero: new FormControl(resultado.numero, [Validators.required, Validators.maxLength(20)]),
      limite: new FormControl(resultado.limite, [Validators.required]),
      userId: new FormControl(resultado.userId),
      });
    });
  }


  get f() {
    return this.form.controls;
  }


  retornar(): void {
    this.router.navigate(['cartoes/listagem']);
  }

  submitCartao(): void {
    const cartao = this.form.value;
    this.erros = [];
    this.cartoesService
      .UpdateCartao(this.cartaoId, cartao)
      .subscribe((resultado) => {
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
        }
      }
    );
  }
}

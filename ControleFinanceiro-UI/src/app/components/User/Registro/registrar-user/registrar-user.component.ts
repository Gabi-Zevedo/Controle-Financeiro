import { DadosRegistro } from './../../../../models/DadosRegistro';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css'],
})
export class RegistrarUserComponent implements OnInit {
  form!: FormGroup;
  foto: File;
  erros: string[];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.CarregarForm();
  }

  CarregarForm() {
    this.form = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.min(4),
        Validators.maxLength(50),
      ]),
      cpf: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(20),
      ]),
      profissao: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(30),
      ]),
      foto: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.min(10),
        Validators.maxLength(50),
        Validators.email,
      ]),
      senha: new FormControl(null, [
        Validators.required,
        Validators.min(6),
        Validators.maxLength(50),
      ]),
    });
  }
  get f() {
    return this.form.controls;
  }

  SelecionarFoto(fileInput: any) {
    this.foto = fileInput.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = function (event: any) {
      document.getElementById('foto')?.setAttribute('src', event.target.result);
    };

    reader.readAsDataURL(this.foto);
  }

  submmitUser(): void {
    const user = this.form.value;
    const formData: FormData = new FormData();
    this.erros = [];

    if (this.foto != null) {
      formData.append('file', this.foto, this.foto.name);
    }

    this.userService.SalvarFoto(formData).subscribe((resultado) => {
      const dadosRegistro: DadosRegistro = new DadosRegistro();
      dadosRegistro.userName = user.userName;
      dadosRegistro.cpf = user.cpf;
      dadosRegistro.profissao = user.profissao;
      dadosRegistro.email = user.email;
      dadosRegistro.senha = user.senha;
      dadosRegistro.foto = resultado.foto;

      this.userService.CreateUser(dadosRegistro).subscribe(
        (dados) => {
          const loggedUser = dados.loggedUser;
          const userId = resultado.userId;
          const user = resultado.user;
          const token = resultado.userToken;
          localStorage.setItem('LoggedUser', loggedUser);
          localStorage.setItem('UserId', userId);
          localStorage.setItem('User', user);
          localStorage.setItem('Token', token);
          this.router.navigate(['categorias/listagem']);
          this.snackBar.open(dados.message, '', {
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
    });
  }
}

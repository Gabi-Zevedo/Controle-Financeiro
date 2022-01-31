import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  form!: FormGroup;
  erros: string[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.erros = [];
    this.Validation();
  }

  Validation() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      senha: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  SubmmitUser() {
    this.erros = [];
    const dadosLogin = this.form.value;

    this.userService.UserLogin(dadosLogin).subscribe(
      (resultado) => {
        const loggedUser = resultado.loggedUser;
        const userId = resultado.userId;
        const user = resultado.user;
        const token = resultado.userToken;
        localStorage.setItem('LoggedUser', loggedUser);
        localStorage.setItem('UserId', userId);
        localStorage.setItem('User', user);
        localStorage.setItem('Token', token);
        this.router.navigate(['categorias/listagem']);
      },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        } else {
          this.erros.push(err.error);
        }
      }
    );
  }
}

import { UpdateUser } from './../../../models/UpdateUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  form!: FormGroup;
  userId: any = localStorage.getItem('UserId');
  userName: string;
  imageURL: SafeResourceUrl;
  foto: File;
  fotoAntiga: File;
  erros: string[];

  constructor(
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.CarregarUser();
  }

  CarregarUser() {
    this.userService.GetUserFoto(this.userId).subscribe((resultado) => {
      this.fotoAntiga = resultado.image;
      this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/png;base64,' + resultado.image
      );
    });

    this.userService.GetUserById(this.userId).subscribe((resultado) => {
      this.userName = resultado.userName;

      this.form = new FormGroup({
        id: new FormControl(resultado.id),
        userName: new FormControl(resultado.userName, [
          Validators.required,
          Validators.min(4),
          Validators.maxLength(50),
        ]),
        cpf: new FormControl(resultado.cpf, [
          Validators.required,
          Validators.min(1),
          Validators.maxLength(20),
        ]),
        profissao: new FormControl(resultado.profissao, [
          Validators.required,
          Validators.min(1),
          Validators.maxLength(30),
        ]),
        foto: new FormControl(null),
        email: new FormControl(resultado.email, [
          Validators.required,
          Validators.min(10),
          Validators.maxLength(50),
          Validators.email,
        ]),
      });
    });
  }


  get f() {
    return this.form.controls;
  }

  SelecionarFoto(fileInput: any) {
    this.foto = fileInput.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = function (event: any) {
      document.getElementById('foto')?.removeAttribute('hidden');
      document.getElementById('foto')?.setAttribute('src', event.target.result);
    };

    reader.readAsDataURL(this.foto);
  }

  retornar() {
    this.router.navigate(['/cartoes/listagem']);
  }

  SubmitUser() {
    const user = this.form.value;
    this.erros = [];

    if (this.foto != null) {
      const formData: FormData = new FormData();
      formData.append('file', this.foto, this.foto.name);

      this.userService.SalvarFoto(formData).subscribe((resultado) => {
        const updateUser: UpdateUser = new UpdateUser();
        updateUser.id = user.id;
        updateUser.userName = user.userName;
        updateUser.cpf = user.cpf;
        updateUser.profissao = user.profissao;
        updateUser.email = user.email;
        updateUser.foto = resultado.foto;

        this.userService.UpdateUser(updateUser).subscribe(
          (resultadoUpdate) => {
            this.router.navigate(['/cartoes/listagem']);
            this.snackBar.open(resultadoUpdate.message, '', {
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
            if (err.status === 500) {
              this.erros.push('Erro ao salvar a foto');
            }
          }
        );
      });
    } else {
      const updateUser: UpdateUser = new UpdateUser();
      updateUser.id = user.id;
      updateUser.userName = user.userName;
      updateUser.cpf = user.cpf;
      updateUser.profissao = user.profissao;
      updateUser.email = user.email;
      updateUser.foto = this.fotoAntiga;

      this.userService.UpdateUser(updateUser).subscribe(
        (resultadoUpdate) => {
          this.router.navigate(['/cartoes/listagem']);
          this.snackBar.open(resultadoUpdate.message, '', {
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
}

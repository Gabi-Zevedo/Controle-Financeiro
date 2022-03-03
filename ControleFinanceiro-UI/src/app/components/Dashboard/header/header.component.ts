import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser = localStorage.getItem("User");
  userId: any = localStorage.getItem('UserId');
  imageURL: SafeResourceUrl;

  constructor(private router:Router, private spinner:NgxSpinnerService,
    private userService: UserService,
    private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.CarregarFoto();
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['user/login'])
  }

  Teste(){
    this.router.navigate(['cartoes/listagem']);
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
  AtualizarUsuario(){
    this.router.navigate(['user/atualizar']);
  }
  CarregarFoto() {
    this.userService.GetUserFoto(this.userId).subscribe((resultado) => {
      this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/png;base64,' + resultado.image
      );
    });
  }

}

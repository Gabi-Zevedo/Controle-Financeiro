import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser = localStorage.getItem("User");

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['user/login'])
  }

  Teste(){
    this.router.navigate(['cartoes/listagem']);
  }

}

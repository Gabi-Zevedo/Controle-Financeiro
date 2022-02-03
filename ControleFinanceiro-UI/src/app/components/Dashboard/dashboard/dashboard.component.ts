import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isADM: boolean;

  constructor(private authGuard: AuthGuardService) { }

  ngOnInit(): void {
    this.isADM = this.authGuard.VerifyAdmin();
  }

}

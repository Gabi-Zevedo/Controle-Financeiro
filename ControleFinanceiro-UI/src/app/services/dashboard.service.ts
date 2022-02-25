import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'api/dashboard';
  constructor(private http: HttpClient) { }

  GetDadosCardsDashboard(userId: string): Observable<any>{
    const apiURL = `${this.url}/GetDadosCardsDashboard/${userId}`;
    return this.http.get<any>(apiURL);
  }
  GetYearDataByUserId(userId: string, year: number): Observable<any>{
    const apiURL = `${this.url}/GetYearDataByUserId/${userId}/${year}`;
    return this.http.get<any>(apiURL);
  }
}

import { DadosLogin } from './../models/DadosLogin';
import { DadosRegistro } from './../models/DadosRegistro';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Token')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='api/users'

  constructor(private http: HttpClient) { }

  SalvarFoto(formData: any): Observable<any>{
    const apiURL = `${this.url}/SalvarFoto`;
    return this.http.post<any>(apiURL, formData);
  }

  CreateUser(userData: DadosRegistro): Observable<any>{
    const apiURL = `${this.url}/CreateUser`;
    return this.http.post<DadosRegistro>(apiURL, userData)
  }

  UserLogin(dadosLogin :DadosLogin): Observable<any>{
    const apiURL = `${this.url}/UserLogin`;
    return this.http.post<DadosLogin>(apiURL, dadosLogin)
  }
}

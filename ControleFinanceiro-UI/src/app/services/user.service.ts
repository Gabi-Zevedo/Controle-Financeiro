import { DadosRegistro } from './../models/DadosRegistro';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
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
}

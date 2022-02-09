import { Despesa } from './../models/Despesa';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('Token')}`,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  url = 'api/despesas'

  constructor(private http: HttpClient) { }

  GetById(id: number): Observable<Despesa>{
    const apiURL = `${this.url}/${id}`;
    return this.http.get<Despesa>(apiURL);
  }

  GetByUserId(userId: string): Observable<Despesa[]> {
    const apiURL = `${this.url}/GetDespesasByUserId/${userId}`;
    return this.http.get<Despesa[]>(apiURL);
  }

  AddDespesa(despesa:Despesa): Observable<any>{
    return this.http.post<Despesa>(this.url, despesa, httpOptions);
  }

  UpdateDespesa(id: number, despesa: Despesa): Observable<any>{
    const apiURL = `${this.url}/${id}`;
    return this.http.put<Despesa>(apiURL, despesa, httpOptions)
  }

  DeleteDespesa(id: number): Observable<any>{
    const apiURL = `${this.url}/${id}`;
    return this.http.delete<Despesa>(apiURL,httpOptions);
  }

}

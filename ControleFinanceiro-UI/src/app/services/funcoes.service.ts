import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcao } from '../models/Funcao';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Token')}`
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FuncoesService {
  url = 'api/funcoes';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Funcao[]> {
    return this.http.get<Funcao[]>(this.url);
  }

  GetById(id: string): Observable<Funcao> {
    const apiURL = `${this.url}/${id}`;
    return this.http.get<Funcao>(apiURL);
  }

  AddFuncao(funcao: Funcao): Observable<any> {
    return this.http.post<Funcao>(this.url, funcao, httpOptions);
  }

  UpdateFuncao(id: string, funcao: Funcao): Observable<any> {
    const apiURL = `${this.url}/${id}`;
    return this.http.put<Funcao>(apiURL, funcao, httpOptions);
  }

  DeleteFuncao(id: string): Observable<any> {
    const apiURL = `${this.url}/${id}`;
    return this.http.delete<string>(apiURL, httpOptions);
  }

  FiltrarFuncao(termo: string): Observable<Funcao[]>{
  const apiURL = `${this.url}/filtrarFuncoes/${termo}`;
  return this.http.get<Funcao[]>(apiURL)
  }
}

import { Cartao } from './../models/Cartao';
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
  providedIn: 'root',
})
export class CartoesService {
  url = 'api/cartoes';

  constructor(private http: HttpClient) {}

  GetById(id: number): Observable<Cartao> {
    const apiURL = `${this.url}/${id}`;
    return this.http.get<Cartao>(apiURL);
  }

  GetByUserId(userId: string): Observable<Cartao[]> {
    const apiURL = `${this.url}/GetCartoesByUserId/${userId}`;
    return this.http.get<Cartao[]>(apiURL);
  }

  AddCartao(cartao: Cartao): Observable<any>{
    return this.http.post<Cartao>(this.url, cartao, httpOptions);
  }

  UpdateCartao(id: number, cartao: Cartao): Observable<any> {
    const apiURL = `${this.url}/${id}`;
    return this.http.put<Cartao>(apiURL, cartao, httpOptions);
  }

  DeleteCartao(id: number): Observable<any> {
    const apiURL = `${this.url}/${id}`;
    return this.http.delete<number>(apiURL, httpOptions);
  }


  FiltrarCartao(termo: string): Observable<Cartao[]>{
    const apiURL = `${this.url}/filtrarCartoes/${termo}`;
    return this.http.get<Cartao[]>(apiURL)
    }

}

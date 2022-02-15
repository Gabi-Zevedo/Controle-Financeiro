import { Ganho } from './../models/Ganho';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('Token')}`,
  }),
};


@Injectable({
  providedIn: 'root'
})
export class GanhosService {
  url = 'api/ganhos'

  constructor(private http: HttpClient) { }

  GetById(id: number): Observable<Ganho>{
    const apiURL = `${this.url}/${id}`;
    return this.http.get<Ganho>(apiURL);
  }

  GetByUserId(userId: string): Observable<Ganho[]> {
    const apiURL = `${this.url}/GetGanhosByUserId/${userId}`;
    return this.http.get<Ganho[]>(apiURL);
  }

  AddGanho(ganho:Ganho): Observable<any>{
    return this.http.post<Ganho>(this.url, ganho, httpOptions);
  }

  UpdateGanho(id: number, ganho: Ganho): Observable<any>{
    const apiURL = `${this.url}/${id}`;
    return this.http.put<Ganho>(apiURL, ganho, httpOptions)
  }

  DeleteGanho(id: number): Observable<any>{
    const apiURL = `${this.url}/${id}`;
    return this.http.delete<Ganho>(apiURL,httpOptions);
  }


  FiltrarGanho(termo: string): Observable<Ganho[]>{
    const apiURL = `${this.url}/filtrarGanhos/${termo}`;
    return this.http.get<Ganho[]>(apiURL)
    }

}

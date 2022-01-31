import { Categoria } from './../models/categoria';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/Json',
    'Authorization': `Bearer ${localStorage.getItem('Token')}`
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  url: string = 'api/Categorias';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
  }

  GetCategoriaById(categoriaId: number): Observable<Categoria>{
    const apiURL = `${this.url}/${categoriaId}`;

    return this.http.get<Categoria>(apiURL);
  }

  AddCategoria(categoriaId: number): Observable<any>{
    console.log(localStorage.getItem('Token'));

    return this.http.post<Categoria>(this.url, categoriaId, httpOptions);
  }

  UpdateCategoria(categoriaId: number, categoria: Categoria): Observable<any>{
    const apiURL = `${this.url}/${categoriaId}`;

    return this.http.put<Categoria>(apiURL, categoria, httpOptions);
  }

  DeleteCategoria(categoriaId: number): Observable<any>{
    const apiURL = `${this.url}/${categoriaId}`;
    return this.http.delete<number>(apiURL, httpOptions);
  }
  FiltrarCategorias(termo: string): Observable<Categoria[]>{
    const apiURL = `${this.url}/filtrarCategorias/${termo}`;
    return this.http.get<Categoria[]>(apiURL);
  }
}

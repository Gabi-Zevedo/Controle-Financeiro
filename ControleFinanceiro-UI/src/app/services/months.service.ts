import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Month } from '../models/Month';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {

  url: string = 'api/Months';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Month[]>{
    return this.http.get<Month[]>(this.url);
  }
}

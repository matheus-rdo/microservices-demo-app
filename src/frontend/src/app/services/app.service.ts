import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}api/user`)
  }

  public consultarBalancoFinanceiro(cpf): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}api/balance/${cpf}`)
  }

  public cadastrar(usuario): Observable<any> {
    return this.http.post(`${environment.apiUrl}api/user`, usuario);
  }
}

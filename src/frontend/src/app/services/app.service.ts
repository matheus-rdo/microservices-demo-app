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
}

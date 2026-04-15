import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})

export class Users {
  private readonly baseUrl = "http://localhost:3000/api/usuarios";

  private readonly loginUrl = "http://localhost:3000/api/login";
  
  private http = inject(HttpClient);

  getLogin( data: string ) : Observable<any> {
    return this.http.post(this.loginUrl, data, {headers: {'content-Type': 'application/json'}});
  }

  createUser( data: FormData ) : Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getUser( id_usuario:number ) : Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${id_usuario}`);
  }
}

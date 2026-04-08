import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Users {
  private readonly baseUrl = "http://localhost:3000/api/usuarios";
  
  private http = inject(HttpClient);

  getLogin( nombre_usuario:string, contra:string ) : Observable<any> {
    return this.http.get(this.baseUrl, {
      headers: {
        'nombre-usuario': nombre_usuario,
        'contra': contra
      }
    });
  }

  createUser( data: FormData ) : Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}

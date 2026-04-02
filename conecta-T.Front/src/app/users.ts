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

  createUser( nombre_usuario:string, contra:string, fecha_nac:Date ) : Observable<any> {

    const body = {
      nombreUsuario: nombre_usuario,
      contrasena: contra,
      fechaNac: fecha_nac+'T00:00:00Z'
    };

    return this.http.post(this.baseUrl, body);
  }
}

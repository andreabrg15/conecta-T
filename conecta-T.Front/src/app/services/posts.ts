import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post-model';

@Injectable({
  providedIn: 'root',
})

export class Posts {
  private readonly baseUrl = "http://localhost:3000/api/publicaciones";

  private http = inject(HttpClient);

  createPost( data: FormData ) : Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getPostsFollowed( id_usuario: number ) : Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.baseUrl}/${id_usuario}`);
  }
}

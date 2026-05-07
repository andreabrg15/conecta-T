import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Users } from '../../services/users';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [RouterLink, AsyncPipe],
  template: ` 
  <div class="min-h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600">
    <div class="grid grid-cols-5 p-10">
      @if (user$ | async; as user) {
      <div class="flex flex-col gap-4 items-center">
        @if (user.foto) {
          <img src="{{getPhotoUrl(user.foto)}}" class="size-35 rounded-full border-2 border-white" alt="Imagen de perfil">
        }
        @else {
          <img src="user_profile_avatar_icon.png" class="size-35 bg-zinc-300 rounded-full border-2 border-white" alt="Imagen de perfil">
        }
        <p>{{user.nombreUsuario}}</p>
      </div>
      <div class="col-span-3">
        Publicaciones de seguidos
      </div>
      <div>
        <button class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-2xl tracking-[0.2em] rounded-2xl px-7 py-2">
          <a [routerLink]="['/publicar']">Publicar</a>
        </button>
      </div>
      }
    </div>
  </div> `,
  styles: ``,
})
export class Feed {
  userService: Users = inject(Users);
  userId = Number.parseInt(sessionStorage.getItem("id") || "0");
  user$ = this.userService.getUser(this.userId);

  getPhotoUrl(url: string) {
    return 'http://localhost:3000/'+url.replace(/\\/g, '/');
  }
}

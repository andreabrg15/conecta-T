import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../users';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  template: `
    <div class="min-h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600 flex flex-col items-center">
      @if (user$ | async; as user) {
        <div class="flex flex-col items-center text-center gap-5 p-10">
          @if (user.foto) {
            <img src="{{getPhotoUrl(user.foto)}}" class="w-48 h-48 rounded-full border-2 border-white" alt="Imagen de perfil">
          }
          @else {
            <img src="user_profile_avatar_icon.png" class="w-48 h-48 bg-zinc-300 rounded-full border-2 border-white" alt="Imagen de perfil">
          }
          <h2 class="text-3xl tracking-[0.1em] font-bold font-story-script text-white">{{user.nombreUsuario}}</h2>
          <div class="flex gap-5 text-xl text-zinc-800 font-bold">
            <p>Seguidos 0</p>
            <p>Seguidores 0</p>
          </div>
          <p class="text-xl text-zinc-800 font-bold">Se unio el {{getDateFormat(user.fechaCreacion.toString())}}</p>
          <button class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-xl tracking-[0.2em] rounded-2xl px-5">
            Editar
          </button>
          <div class="min-h-[30vh] flex flex-col justify-center">
            <p class="text-xl text-zinc-800 font-bold">Aún no tiene publicaciones :c</p>
          </div>
        </div>
    }
    </div>
  `,
  styles: ``,
})

export class Profile {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: Users = inject(Users);
  id = this.route.snapshot.params['id'];

  user$ = this.userService.getUser(this.id);

  getPhotoUrl(url: string) {
    return 'http://localhost:3000/'+url.replace(/\\/g, '/');
  }

  getDateFormat(date: string) {
    return date.split('T')[0].split('-').reverse().join('-').replace(/-/g, '/');
  }

}

import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-feed',
  imports: [RouterLink],
  template: ` 
  <div class="min-h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600">
    <div class="grid grid-cols-5 p-10">
      <div class="flex flex-col gap-4 items-center">
        <img src="user_profile_avatar_icon.png" class="size-35 bg-zinc-300 rounded-full border-2 border-white" alt="Imagen de perfil">
        <p>Username123</p>
      </div>
      <div class="col-span-3">
        Publicaciones de seguidos
      </div>
      <div>
        <button class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-2xl tracking-[0.2em] rounded-2xl px-7 py-2">
          <a [routerLink]="['/publicar']">Publicar</a>
        </button>
      </div>
    </div>
  </div> `,
  styles: ``,
})
export class Feed {}

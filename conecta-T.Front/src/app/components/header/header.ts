import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: ` 
  <div class="bg-pink-950 h-[12dvh] font-story-script font-bold text-white flex items-center">
    <a class="pl-10 text-3xl tracking-[0.25em] hover:cursor-pointer" [routerLink]="sesion_iniciada() ? ['/feed'] : ['/']">Conecta-T</a>
    @if (sesion_iniciada()) {
      <a class="text-lg tracking-[0.2em] px-5 py-4 rounded-full ml-auto mr-5 hover:bg-pink-900 hover:cursor-pointer"
      [routerLink]="['/']"
      (click)="cerrar_sesion()">
        Cerrar sesion
      </a>
    }
  </div> `,
  styles: ``,
})
export class Header {
  sesion_iniciada() : boolean {
    if (sessionStorage.getItem('id') != null) {
      return true;
    } else {
      return false;
    }
  }

  cerrar_sesion() {
    sessionStorage.removeItem('id');
  }
}

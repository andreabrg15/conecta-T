import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: ` 
  <div class="bg-pink-950 h-[12dvh] font-story-script font-bold text-white flex items-center">
    <a class="pl-10 text-3xl tracking-[0.25em] hover:cursor-pointer" [routerLink]="['/']">Conecta-T</a>
  </div> `,
  styles: ``,
})
export class Header {}

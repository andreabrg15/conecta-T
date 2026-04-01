import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  template: ` 
  <div class="h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600 flex flex-col lg:flex-row items-center justify-center md:gap-15 lg:gap-25">
    <div>
      <section class="bg-linear-to-br from-zinc-950 to-zinc-700 rounded-4xl px-20 py-15 shadow-xl/50">
        <form [formGroup]="loginForm" (submit)="submitLogin()" class="text-center grid justify-center gap-3">
          <label for="username" class="text-white font-story-script text-2xl">Nombre de usuario:</label>
          <input id="username" type="text" placeholder="andreabrg..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Username"/>

          <label for="password" class="text-white font-story-script text-2xl">Contraseña:</label>
          <input id="password" type="password" placeholder="contraseña..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Password"/>

          <button type="submit" class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-lg rounded-2xl p-1 mt-4">
            Iniciar Sesión
          </button>
        </form>
      </section>
    </div>
    <div class="hidden md:block">
      <img src="home-image.jpg" alt="Home Pictures" class="w-[70dvw] md:w-[60dvw] lg:w-[42dvw] rounded-xl saturate-130"/>
    </div>
  </div> `,
  styles: ``,
})

export class Home {
  loginForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  });

  submitLogin() {
    this.loginForm.value.Username ?? '';
    this.loginForm.value.Password ?? '';

    alert('Usuario:'+this.loginForm.value.Username+' Contraseña:'+this.loginForm.value.Password);
  }
}

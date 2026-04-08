import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../users';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, RouterLink],
  template: ` 
  <div class="h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600 flex flex-col lg:flex-row items-center justify-center md:gap-15 lg:gap-25">
    <div>
      <section class="bg-linear-to-br from-zinc-950 to-zinc-700 rounded-4xl p-10 md:p-15  shadow-xl/50">
        <form [formGroup]="loginForm" (submit)="submitLogin()" class="text-center grid justify-center gap-3">
          <div class="grid">
          <label class="text-white font-story-script text-2xl"> Nombre de usuario: </label>
          <input id="username" type="text" placeholder="usuario123..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Username"/>
          </div>
          <div class="grid">
          <label for="password" class="text-white font-story-script text-2xl"> Contraseña: </label>
          <input id="password" type="password" placeholder="contraseña..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Password"/>
          </div>

          <button type="submit" class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-lg rounded-2xl p-1 mt-4">
            Iniciar Sesión
          </button>
        </form>
        <p class="text-white mt-5">
          ¿Aún no tienes una cuenta? <a class="text-blue-400 underline hover:cursor-pointer" [routerLink]="['/registro']">Registrate</a>
        </p>
      </section>
    </div>
    <div class="hidden md:block">
      <img src="home-image.jpg" alt="Home Pictures" class="w-[70dvw] md:w-[60dvw] lg:w-[42dvw] rounded-xl saturate-130"/>
    </div>
  </div> `
})

export class Home {

  userService: Users = inject(Users);

  loginForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  });

  constructor(private router: Router) {}

  submitLogin() {
    this.loginForm.value.Username ?? '';
    this.loginForm.value.Password ?? '';

    this.userService
    .getLogin(this.loginForm.value.Username || '', this.loginForm.value.Password || '')
    .subscribe({
      next: (value) => {
        localStorage.setItem('Id_usuario', value);
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }
}

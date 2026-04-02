import { Component, inject } from '@angular/core';
import { Users } from '../../users';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  template: ` 
  <div class="h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600 flex flex-col items-center justify-center gap-8">
    <h2 class="text-[2.5rem] tracking-[0.1em] font-bold font-story-script">Registro de Usuario</h2>
    <div>
      <section class="bg-linear-to-br from-zinc-950 to-zinc-700 rounded-4xl p-10 md:p-15  shadow-xl/50">
        <form [formGroup]="registerForm" (submit)="submitRegister()" class="text-center grid justify-center gap-3">
          <label for="username" class="text-white font-story-script text-2xl">Nombre de usuario:</label>
          <input id="username" type="text" placeholder="usuario123..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Username"/>

          <label for="password" class="text-white font-story-script text-2xl">Contraseña:</label>
          <input id="password" type="password" placeholder="contraseña..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Password"/>

          <label for="birthdate" class="text-white font-story-script text-2xl">Fecha de nacimiento:</label>
          <input id="birthdate" type="date"
          class="bg-white/60 p-2 rounded-md" formControlName="Birthdate"/>

          <button type="submit" class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-lg rounded-2xl p-1 mt-4">
            Registrarse
          </button>
        </form>
      </section>
    </div>
  </div>`
})
export class Register {
  userService: Users = inject(Users);

  registerForm = new FormGroup({
    Username: new FormControl<string>(''),
    Password: new FormControl<string>(''),
    Birthdate: new FormControl<Date|null>(null)
  });

  constructor(private router: Router) {}

  submitRegister() {
    this.registerForm.value.Username ?? '';
    this.registerForm.value.Password ?? '';

    this.userService
    .createUser(this.registerForm.value.Username || '', this.registerForm.value.Password || '', this.registerForm.value.Birthdate || new Date())
    .subscribe({
      next: () => {
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }
}

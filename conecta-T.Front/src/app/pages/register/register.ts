import { Component, inject, OnDestroy } from '@angular/core';
import { Users } from '../../services/users';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  template: ` 
  <div class="min-h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600 flex flex-col items-center justify-center gap-4 md:gap-8">
    <h2 class="text-[2rem] md:text-[2.5rem] tracking-[0.1em] font-bold font-story-script pt-5">Registro de Usuario</h2>
    <div class="pb-10">
      <section class="bg-linear-to-br from-zinc-950 to-zinc-700 rounded-4xl md:p-8 lg:p-15  shadow-xl/50">
        <form [formGroup]="registerForm" (submit)="submitRegister()" class="text-center grid md:grid-cols-2 justify-center gap-3" enctype="multipart/form-data">
          <div class="grid px-5 pt-10 md:p-0">
          <label for="username" class="text-white font-story-script text-2xl">Nombre de usuario:</label>
          <input id="username" type="text" placeholder="usuario123..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Username"/>
          </div>
          <div class="grid px-5 pt-5 md:p-0">
          <label for="password" class="text-white font-story-script text-2xl">Contraseña:</label>
          <input id="password" type="password" placeholder="contraseña..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Password"/>
          </div>
          <div class="grid px-5 pt-5 md:p-0">
          <label for="birthdate" class="text-white font-story-script text-2xl">Fecha de nacimiento:</label>
          <input id="birthdate" type="date"
          class="bg-white/60 p-2 rounded-md" formControlName="Birthdate"/>
          </div>
          <div class="grid px-3 pt-5 md:p-0">
          <label for="photoUrl" class="text-white font-story-script text-2xl">Foto de perfil:</label>
          <input id="photoUrl" type="file" accept=".jpg, .png, .jpeg" (change)="OnSelectedFile($event)"
          class="bg-white/60 rounded-md cursor-pointer file:bg-zinc-500/80 file:p-2" formControlName="Photo"/>
          </div>
          <div class="grid justify-center md:col-span-2 pt-4">
            <img alt="Preview Photo" src="{{avatarUrl}}" class="max-w-35 md:max-w-40 lg:max-w-45 bg-zinc-300 rounded-xl">
          </div>

          <div class="grid px-5 pb-5 md:p-0 md:col-span-2">
          <button type="submit" class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-lg rounded-2xl p-1 mt-4">
            Registrarse
          </button>
          </div>
        </form>
      </section>
    </div>
  </div>`
})

export class Register implements OnDestroy {
  userService: Users = inject(Users);

  selectedFile: File|null = null;
  avatarUrl: string = 'user_profile_avatar_icon.png';

  registerForm = new FormGroup({
    Username: new FormControl<string>(''),
    Password: new FormControl<string>(''),
    Photo: new FormControl<File|null>(null),
    Birthdate: new FormControl<Date|null>(null)
  });

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    if (this.avatarUrl) {
      URL.revokeObjectURL(this.avatarUrl);
    }
  }

  OnSelectedFile( e:any ) {
    this.selectedFile = e.target.files[0];

    if (this.selectedFile) {
      this.avatarUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  submitRegister() {

    const formData = new FormData();

    formData.append('nombreUsuario', this.registerForm.value.Username || '');
    formData.append('contrasena', this.registerForm.value.Password || '');
    formData.append('fechaNac', this.registerForm.value.Birthdate+'T00:00:00Z' || '');

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.userService
    .createUser(formData)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }
}

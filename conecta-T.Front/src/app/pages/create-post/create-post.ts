import { Component, inject, OnDestroy } from '@angular/core';
import { Posts } from '../../services/posts';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  template: ` 
  <div class="min-h-[88dvh] bg-linear-to-b from-slate-400 to-zinc-600 flex flex-col items-center justify-center gap-4 md:gap-8">
    <h2 class="text-[2rem] md:text-[2.5rem] tracking-[0.1em] font-bold font-story-script pt-0 pb-5 md:pb-0 md:pt-5">Crear publicacion</h2>
    <div class="pb-10">
      <section class="bg-linear-to-br from-zinc-950 to-zinc-700 rounded-4xl p-2 md:p-8 lg:p-12  shadow-xl/50">
        <form [formGroup]="postForm" (submit)="submitPost()" class="text-center flex flex-col justify-center gap-3" enctype="multipart/form-data">
          <div class="grid px-5 pt-5 md:p-0">
          <label for="text-post" class="text-white font-story-script text-2xl">Texto:</label>
          <textarea id="text-post" placeholder="Escribe algo..." 
          class="bg-white/60 p-2 rounded-md" formControlName="Text_Post">
          </textarea>
          </div>
          <div class="grid px-3 pt-5 md:p-0">
          <label for="photoUrl" class="text-white font-story-script text-2xl">Incluye una imagen:</label>
          <input id="photoUrl" type="file" accept=".jpg, .png, .jpeg" (change)="OnSelectedFile($event)"
          class="bg-white/60 rounded-md cursor-pointer file:bg-zinc-500/80 file:p-2" formControlName="Photo"/>
          </div>
          <div class="grid justify-center md:col-span-2 pt-4">
            <img alt="Preview Photo" src="{{photoUrl}}" class="max-w-80 max-h-40 lg:max-h-45 bg-zinc-300 rounded-xl">
          </div>

          <div class="grid px-5 pb-5 md:p-0 md:col-span-2">
          <button type="submit" class="bg-rose-900 text-white hover:scale-105 hover:cursor-pointer font-story-script text-lg rounded-2xl p-1 mt-4">
            Publicar
          </button>
          </div>
        </form>
      </section>
    </div>
  </div> `, 
  styles: ``,
})
export class CreatePost implements OnDestroy {
  postService: Posts = inject(Posts);

  id_usuario: string|null = '';
  selectedFile: File|null = null;
  photoUrl: string = '';

  postForm = new FormGroup({
    Text_Post: new FormControl<string>(''),
    Photo: new FormControl<File|null>(null)
  });

  constructor(private router: Router) {
    this.id_usuario = sessionStorage.getItem('id');
  }

  ngOnDestroy(): void {
    if (this.photoUrl) {
      URL.revokeObjectURL(this.photoUrl);
    }
  }

  OnSelectedFile( e:any ) {
    this.selectedFile = e.target.files[0];

    if (this.selectedFile) {
      this.photoUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  submitPost() {

    const formData = new FormData();

    formData.append('texto', this.postForm.value.Text_Post || '');
    formData.append('foto', this.selectedFile || '');
    formData.append('autorId', this.id_usuario || '');

    this.postService
    .createPost(formData)
    .subscribe({
      next: () => {
        this.router.navigate(['/perfil', this.id_usuario]);
      },
      error: (err) => {
        console.log(err.error);
      }
    });

  }
}

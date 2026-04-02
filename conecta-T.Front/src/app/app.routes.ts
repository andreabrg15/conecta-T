import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Feed } from './pages/feed/feed';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
        path: '', 
        component: Home
    },
    {
        path: 'registro', 
        component: Register,
        title: 'Conecta-T | Registro'
    },
    {
        path: 'perfil', 
        component: Profile,
        title: 'Conecta-T | Perfil'
    },
    {
        path: 'feed', 
        component: Feed,
        title: 'Conecta-T | Inicio'
    },
    {
        path: '**', redirectTo: ''
    }
];

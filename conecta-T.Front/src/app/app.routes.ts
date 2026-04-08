import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Feed } from './pages/feed/feed';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
        path: '', 
        component: Home,
        title: 'Conecta-T'
    },
    {
        path: 'registro', 
        component: Register,
        title: 'Registro | Conecta-T'
    },
    {
        path: 'perfil', 
        component: Profile,
        title: 'Perfil | Conecta-T'
    },
    {
        path: 'feed', 
        component: Feed,
        title: 'Inicio | Conecta-T'
    },
    {
        path: '**', redirectTo: ''
    }
];

import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Feed } from './pages/feed/feed';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'profile', component: Profile
    },
    {
        path: 'feed', component: Feed
    },
    {
        path: '**', redirectTo: ''
    }
];

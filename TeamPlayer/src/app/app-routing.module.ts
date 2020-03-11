import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadChildren: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksPageModule)
    },
    {
        path: 'events',
        loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
    },
    {
        path: 'note',
        loadChildren: () => import('./pages/note/note.module').then(m => m.NotePageModule)
    },
    {
        path: 'teams',
        loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsPageModule)
    },
    {
        path: 'my-profile',
        loadChildren: () => import('./pages/my-profile/my-profile.module').then(m => m.MyProfilePageModule),
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

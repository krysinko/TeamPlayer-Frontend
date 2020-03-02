import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'folder/main',
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
    // {
    //   path: 'folder/:id',
    //   loadChildren: () => import('./modules/folder/folder.module').then(m => m.FolderPageModule)
    // },
    {
        path: 'folder/main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
    },
    {
        path: 'folder/tasks',
        loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksPageModule)
    },
    {
        path: 'folder/events',
        loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
    },
    {
        path: 'folder/note',
        loadChildren: () => import('./pages/note/note.module').then(m => m.NotePageModule)
    },
    {
        path: 'folder/teams',
        loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsPageModule)
    },
    {
        path: 'folder/my-profile',
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

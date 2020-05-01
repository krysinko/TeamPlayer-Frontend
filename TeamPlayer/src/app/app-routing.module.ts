import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
        loadChildren: () => import('./modules/pages/main/main.module').then(m => m.MainPageModule)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./modules/pages/tasks/tasks.module').then(m => m.TasksPageModule)
    },
    {
        path: 'meetings',
        loadChildren: () => import('./modules/pages/meetings/meetings.module').then(m => m.MeetingsPageModule)
    },
    {
        path: 'note',
        loadChildren: () => import('./modules/pages/note/note.module').then(m => m.NotePageModule)
    },
    {
        path: 'teams',
        loadChildren: () => import('./modules/pages/teams/teams.module').then(m => m.TeamsPageModule)
    },
    {
        path: 'my-profile',
        loadChildren: () => import('./modules/pages/my-profile/my-profile.module').then(m => m.MyProfilePageModule),
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {
}

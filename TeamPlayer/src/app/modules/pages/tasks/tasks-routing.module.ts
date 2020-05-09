import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksPage } from './tasks.page';

const routes: Routes = [
    {
        path: '',
        component: TasksPage
    },
    {
        path: 'task-details/:id',
        loadChildren: () => import('./task-details/task-details.module').then(m => m.TaskDetailsPageModule)
    },
    {
        path: 'new',
        loadChildren: () => import('./new-task/new-task.module').then(m => m.NewTaskPageModule)
    }


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class TasksPageRoutingModule {
}

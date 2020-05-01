import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsPage } from './meetings.page';

const routes: Routes = [
    {
        path: '',
        component: MeetingsPage
    },
    {
        path: 'meeting-details/:id',
        loadChildren: () => import('./meeting-details/meeting-details.module').then(m => m.MeetingDetailsPageModule)
    }

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class MeetingsPageRoutingModule {
}

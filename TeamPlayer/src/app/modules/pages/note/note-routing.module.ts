import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotePage } from './note.page';
import { NoteDetailsPageModule} from './note-details/note-details.module';

const routes: Routes = [
    {
        path: '',
        component: NotePage
    },
  {
    path: 'note-details/:id',
    loadChildren: () => import('./note-details/note-details.module').then( m => m.NoteDetailsPageModule)
  }

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class NotePageRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteDetailsPage } from './note-details.page';
import { CustomFormsModule } from '../../../../components/forms/custom-forms.module';

const routes: Routes = [
  {
    path: '',
    component: NoteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CustomFormsModule],
  exports: [RouterModule],
})
export class NoteDetailsPageRoutingModule {}

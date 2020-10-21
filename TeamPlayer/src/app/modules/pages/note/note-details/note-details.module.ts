import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteDetailsPageRoutingModule } from './note-details-routing.module';

import { NoteDetailsPage } from './note-details.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NoteDetailsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [NoteDetailsPage]
})
export class NoteDetailsPageModule {}

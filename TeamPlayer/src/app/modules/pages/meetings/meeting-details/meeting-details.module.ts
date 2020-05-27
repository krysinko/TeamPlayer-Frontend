import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingDetailsPageRoutingModule } from './meeting-details-routing.module';

import { MeetingDetailsPage } from './meeting-details.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        MeetingDetailsPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MeetingDetailsPage]
})
export class MeetingDetailsPageModule {}

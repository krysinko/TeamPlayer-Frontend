import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetailsPageRoutingModule } from './task-details-routing.module';

import { TaskDetailsPage } from './task-details.page';
import { ComponentsModule } from '../../../../components/components.module';
import { AppModule } from '../../../../app.module';
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TaskDetailsPageRoutingModule,
        ComponentsModule,
        DirectivesModule
    ],
  declarations: [TaskDetailsPage]
})
export class TaskDetailsPageModule {}

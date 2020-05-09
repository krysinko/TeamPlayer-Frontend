import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTaskPageRoutingModule } from './new-task-routing.module';

import { NewTaskPage } from './new-task.page';
import { ComponentsModule } from '../../../../components/components.module';
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewTaskPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
  declarations: [NewTaskPage]
})
export class NewTaskPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { ComponentsModule } from '../../components/components.module';
import { AppPages } from '../../models/app-pages';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TasksPageRoutingModule,
        ComponentsModule
    ],
    providers: [ AppPages ],
    declarations: [ TasksPage ]
})
export class TasksPageModule {
}

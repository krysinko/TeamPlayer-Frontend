import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import {ComponentsModule} from "../../components/components.module";
import {AppPages} from "../../models/app-pages";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EventsPageRoutingModule,
        ComponentsModule
    ],
    declarations: [EventsPage],
    providers: [AppPages]
})
export class EventsPageModule {}

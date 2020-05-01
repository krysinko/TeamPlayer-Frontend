import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { AppPages } from '../../../models/app-pages';
import { MeetingsPageRoutingModule } from './meetings-routing.module';
import { MeetingsPage } from './meetings.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MeetingsPageRoutingModule,
        ComponentsModule
    ],
    declarations: [ MeetingsPage ],
    providers: [ AppPages ]
})
export class MeetingsPageModule {
}

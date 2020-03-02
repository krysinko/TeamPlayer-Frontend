import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyProfilePageRoutingModule} from './my-profile-routing.module';

import {MyProfilePage} from './my-profile.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        MyProfilePageRoutingModule
    ],
    declarations: [MyProfilePage],
    exports: []
})
export class MyProfilePageModule {
}

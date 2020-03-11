import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MainPageRoutingModule} from './main-routing.module';

import {MainPage} from './main.page';
import {ComponentsModule} from '../../components/components.module';
import {AppPages} from "../../models/app-pages";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        MainPageRoutingModule
    ],
    declarations: [MainPage],
    providers: [AppPages]
})
export class MainPageModule {
}

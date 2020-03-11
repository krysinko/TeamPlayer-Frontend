import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamsPageRoutingModule } from './teams-routing.module';

import { TeamsPage } from './teams.page';
import {ComponentsModule} from "../../components/components.module";
import {AppPages} from "../../models/app-pages";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeamsPageRoutingModule,
        ComponentsModule
    ],
    declarations: [TeamsPage],
    providers: [AppPages]

})
export class TeamsPageModule {}

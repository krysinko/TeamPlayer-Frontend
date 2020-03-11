import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';
import {ComponentsModule} from "../../components/components.module";
import {AppPages} from "../../models/app-pages";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NotePageRoutingModule,
        ComponentsModule
    ],
    declarations: [NotePage],
    providers: [AppPages]
})
export class NotePageModule {}

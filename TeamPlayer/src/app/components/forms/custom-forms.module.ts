import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectFieldComponent } from './date-select-field/date-select-field.component';
import { TextareaInputComponent } from './textarea-input/textarea-input.component';
import { TitleInputComponent } from './title-input/title-input.component';
import { UsersSelectFieldComponent } from './users-select-field/users-select-field.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SimpleSelectComponent } from './simple-select/simple-select.component';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
    declarations: [
        DateSelectFieldComponent,
        TextareaInputComponent,
        TitleInputComponent,
        UsersSelectFieldComponent,
        SimpleSelectComponent
    ],
    exports: [
        DateSelectFieldComponent,
        TextareaInputComponent,
        TitleInputComponent,
        UsersSelectFieldComponent,
        SimpleSelectComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        DirectivesModule,
    ]
})
export class CustomFormsModule {
}

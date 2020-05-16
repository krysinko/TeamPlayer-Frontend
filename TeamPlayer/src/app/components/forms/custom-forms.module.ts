import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectFieldComponent } from './date-select-field/date-select-field.component';
import { TextareaInputComponent } from './textarea-input/textarea-input.component';
import { TitleInputComponent } from './title-input/title-input.component';
import { UsersSelectFieldComponent } from './users-select-field/users-select-field.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [DateSelectFieldComponent, TextareaInputComponent, TitleInputComponent, UsersSelectFieldComponent],
  exports: [DateSelectFieldComponent, TextareaInputComponent, TitleInputComponent, UsersSelectFieldComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CustomFormsModule { }

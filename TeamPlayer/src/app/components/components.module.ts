import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderSimpleComponent } from './header-simple/header-simple.component';
import { PopoverDatePickerComponent } from './popover-date-picker/popover-date-picker.component';
import { TaskAssignComponent } from './task-assign/task-assign.component';
import { DirectivesModule } from '../directives/directives.module';
import { AlertPopoverComponent } from './alert-popover/alert-popover.component';
import { CustomFormsModule } from './forms/custom-forms.module';
import { TextareaInputComponent } from './forms/textarea-input/textarea-input.component';
import { SimpleSelectComponent } from './forms/simple-select/simple-select.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        HeaderSimpleComponent,
        PopoverDatePickerComponent,
        TaskAssignComponent,
        AlertPopoverComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        HeaderSimpleComponent,
        PopoverDatePickerComponent,
        TaskAssignComponent,
        AlertPopoverComponent,
        CustomFormsModule
    ],
    entryComponents: [
        PopoverDatePickerComponent,
        TaskAssignComponent,
        AlertPopoverComponent,
        TextareaInputComponent,
        SimpleSelectComponent
    ],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        CustomFormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {
}

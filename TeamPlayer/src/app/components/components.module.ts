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
import { TaskCreateComponent } from './task-create/task-create.component';
import { DirectivesModule } from '../directives/directives.module';
import { AlertPopoverComponent } from './alert-popover/alert-popover.component';
import { CustomFormsModule } from './forms/custom-forms.module';


@NgModule({
    declarations: [ LoginComponent, RegisterComponent, HeaderSimpleComponent, PopoverDatePickerComponent, TaskAssignComponent, TaskCreateComponent, AlertPopoverComponent ],
    exports: [ LoginComponent, RegisterComponent, HeaderSimpleComponent, PopoverDatePickerComponent, TaskAssignComponent, TaskCreateComponent, AlertPopoverComponent, CustomFormsModule ],
    entryComponents: [ PopoverDatePickerComponent, TaskAssignComponent, TaskCreateComponent, AlertPopoverComponent ],
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

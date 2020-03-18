import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderSimpleComponent } from './header-simple/header-simple.component';
import { PopoverDatePickerComponent } from './popover-date-picker/popover-date-picker.component';


@NgModule({
    declarations: [ LoginComponent, RegisterComponent, HeaderSimpleComponent, PopoverDatePickerComponent ],
    exports: [ LoginComponent, RegisterComponent, HeaderSimpleComponent, PopoverDatePickerComponent ],
    entryComponents: [PopoverDatePickerComponent],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {
}

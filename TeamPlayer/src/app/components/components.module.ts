import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderSimpleComponent } from './header-simple/header-simple.component';


@NgModule({
    declarations: [ LoginComponent, RegisterComponent, HeaderSimpleComponent ],
    exports: [ LoginComponent, RegisterComponent, HeaderSimpleComponent ],
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

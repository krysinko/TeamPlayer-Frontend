import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyProfilePage } from './my-profile.page';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

const routes: Routes = [
    {
        path: '',
        component: MyProfilePage,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class MyProfilePageRoutingModule {
}

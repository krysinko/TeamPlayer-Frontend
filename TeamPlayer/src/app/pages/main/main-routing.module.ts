import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainPage} from './main.page';
import {LoginComponent} from '../../components/login/login.component';
import {RegisterComponent} from '../../components/register/register.component';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: MainPage
    }
];

@NgModule({
    imports: [ComponentsModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {
}

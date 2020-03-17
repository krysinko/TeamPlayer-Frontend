import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPage } from './main.page';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: MainPage
    }
];

@NgModule({
    imports: [ ComponentsModule, RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class MainPageRoutingModule {
}

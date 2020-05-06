import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppInjectorService {

    private static _injector: Injector;

    static set injector(injector: Injector) {
        this._injector = injector;
    }

    static get injector(): Injector {
        return this._injector;
    }
}

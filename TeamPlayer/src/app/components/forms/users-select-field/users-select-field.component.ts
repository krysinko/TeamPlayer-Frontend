import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NgControl } from '@angular/forms';
import { ControlValueCore } from '../control-value-core';

@Component({
    selector: 'app-users-select-field',
    templateUrl: './users-select-field.component.html',
    styleUrls: [ './users-select-field.component.scss' ],
})
export class UsersSelectFieldComponent extends ControlValueCore {
    set value(v: Date) {
        if (v && v !== this._value) {
            this._value = v;
            this.onChange(v);
            this.onTouch(v);
        }
    }

    get value() {
        return this._value;
    }

    _value: Date;

    constructor(private popoverController: PopoverController, public ngControl: NgControl) {
        super(ngControl);
    }
}

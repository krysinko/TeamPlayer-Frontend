import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NgControl } from '@angular/forms';
import { ControlValueCore } from '../control-value-core';

@Component({
    selector: 'app-simple-select',
    templateUrl: './simple-select.component.html',
    styleUrls: [ './simple-select.component.scss' ],
})
export class SimpleSelectComponent extends ControlValueCore {
    @Input() optionLabels: string[];
    @Input() options: any[];
    @Input() label: string;
    @Input() placeholder: string;

    set value(v: string) {
        console.log(v);
        if (v && v !== this._value) {
            this._value = v;
            this.onChange(v);
            this.onTouch(v);
        }
    }

    get value() {
        return this._value;
    }

    _value: string;

    constructor(public ngControl: NgControl) {
        super(ngControl);
    }
}

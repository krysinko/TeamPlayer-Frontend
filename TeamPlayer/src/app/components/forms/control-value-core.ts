import { Input } from '@angular/core';
import { NgControl } from '@angular/forms';

export class ControlValueCore {
    set value(v: any) {
        this._value = v;
    }

    get value(): any {
        return this._value;
    }

    @Input() label: string;
    @Input() required: boolean = false;
    @Input() placeholder: string;
    @Input() disabled: boolean = false;

    _value: any;

    constructor(public ngControl: NgControl) {
        ngControl.valueAccessor = this;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(v: any): void {
        this.value = v;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange: any = () => {};

    onTouch: any = () => {};
}

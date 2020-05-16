import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonTaskAttributesActions } from '../../../modules/pages/tasks/common-task-attributes-actions';
import { Task } from '../../../models/task';
import { PopoverDatePickerComponent } from '../../popover-date-picker/popover-date-picker.component';

@Component({
    selector: 'app-date-select-field',
    templateUrl: './date-select-field.component.html',
    styleUrls: [ './date-select-field.component.scss' ],
})
export class DateSelectFieldComponent extends CommonTaskAttributesActions implements ControlValueAccessor {
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

    @Input() text: string;
    // @Input() task: Task;
    _value: Date = new Date(Date.now());

    constructor(public ngControl: NgControl) {
        super();
        ngControl.valueAccessor = this;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(v: Date): void {
        this.value = v;
    }

    onChange: any = () => {};

    onTouch: any = () => {};

    async showDatePicker(): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: PopoverDatePickerComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { date: this.value },
            cssClass: 'popover-date-picker'
        });

            datePopover.onDidDismiss().then(data => {
                if (data.data) {
                    this.value = data.data;
                }
            });

        return datePopover.present();
    }
}

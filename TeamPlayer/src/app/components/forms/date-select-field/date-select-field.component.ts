import { Component } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { PopoverDatePickerComponent } from '../../popover-date-picker/popover-date-picker.component';
import { ControlValueCore } from '../control-value-core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-date-select-field',
    templateUrl: './date-select-field.component.html',
    styleUrls: [ './date-select-field.component.scss' ],
})
export class DateSelectFieldComponent extends ControlValueCore implements ControlValueAccessor {
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

    async showDatePicker(): Promise<void> {
        console.log(this.value);
        const datePopover = await this.popoverController.create({
            component: PopoverDatePickerComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { date: this.value ||  this.getTomorrowDate() },
            cssClass: 'popover-date-picker'
        });

        datePopover.onDidDismiss().then(data => {
            if (data.data) {
                this.value = data.data;
            }
        });

        return datePopover.present();
    }

    private getTomorrowDate(): Date {
        const tomorrow: Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-popover-date-picker',
    templateUrl: './popover-date-picker.component.html',
    styleUrls: [ './popover-date-picker.component.scss' ],
})
export class PopoverDatePickerComponent implements OnInit {
    @Input() date: Date;
    @Input() taskName: string;
    now: Date = new Date();
    dateForm: FormGroup;
    errorMessage: string;
    datePickerOptions: object = {
        showBackdrop: true,
        backdropDismiss: true,
        animated: true,
    };

    constructor(private popoverController: PopoverController, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.buildDateForm();
    }

    saveNewDateTime(): void {
        const timeDate: Date = new Date(this.dateForm.value.time);
        const dateDate: Date = new Date(this.dateForm.value.date);
        dateDate.setHours(timeDate.getHours(), timeDate.getMinutes());
        this.popoverController.dismiss(dateDate);
    }

    dismiss(): void {
        this.popoverController.dismiss();
    }

    private buildDateForm(): void {
        this.date = new Date(this.date) || this.getTomorrowDate();

        this.dateForm = this.formBuilder.group({
            date: this.date.toISOString(),
            time: this.date.toISOString(),
        });
    }

    private getTomorrowDate(): Date {
        const tomorrow: Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }
}

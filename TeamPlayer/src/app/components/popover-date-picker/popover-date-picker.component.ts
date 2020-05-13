import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Task } from '../../models/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-popover-date-picker',
    templateUrl: './popover-date-picker.component.html',
    styleUrls: [ './popover-date-picker.component.scss' ],
})
export class PopoverDatePickerComponent implements OnInit {
    @Input() task: Task;
    @Input() isNewTask: boolean;
    now: Date = new Date();
    dateForm: FormGroup;
    errorMessage: string;
    datePickerOptions: object = {
        showBackdrop: true,
        backdropDismiss: true,
        animated: true,
    };

    constructor(private popoverController: PopoverController, private formBuilder: FormBuilder, private taskService: TaskService) {}

    ngOnInit() {
        this.buildDateForm();
    }

    saveNewDateTime(): void {
        const timeDate: Date = new Date(this.dateForm.value.time);
        const dateDate: Date = new Date(this.dateForm.value.date);
        dateDate.setHours(timeDate.getHours(), timeDate.getMinutes());
        if (!this.isNewTask) {
            this.taskService.updateTask({...this.task, deadline: dateDate});
        }
        this.popoverController.dismiss(dateDate);
    }

    dismiss(): void {
        this.popoverController.dismiss();
    }

    private buildDateForm(): void {
        let date: Date;
        if (this.task && this.task.deadline) {
            date = new Date(this.task.deadline);
        } else {
            date = this.getTomorrowDate();
        }
        this.dateForm = this.formBuilder.group({
            date: date.toISOString(),
            time: date.toISOString(),
        });
    }

    private getTomorrowDate(): Date {
        const tomorrow: Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }
}

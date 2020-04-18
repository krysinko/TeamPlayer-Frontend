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
        console.log(this.task);
        this.buildDateForm();
    }

    saveNewDateTime(): void {
        const timeDate: Date = new Date(this.dateForm.value.time);
        this.task.deadline = new Date(this.dateForm.value.date);
        this.task.deadline.setHours(timeDate.getHours(), timeDate.getMinutes());
        this.taskService.updateTask(this.task);
        this.popoverController.dismiss();
    }

    dismiss(): void {
        this.popoverController.dismiss();
    }

    private buildDateForm(): void {
        let date: Date;
        if (this.task) {
            date = new Date(this.task.deadline);
        } else {
            date = new Date();
        }
        this.dateForm = this.formBuilder.group({
            date: date.toISOString(),
            time: date.toISOString(),
        });
    }
}

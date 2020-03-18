import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';
import { Task } from 'src/app/models/task';
import { TaskService } from '../../../services/task.service';
import { PopoverController } from '@ionic/angular';
import { PopoverDatePickerComponent } from '../../../components/popover-date-picker/popover-date-picker.component';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: [ './tasks.page.scss' ],
})
export class TasksPage implements OnInit {
    title: string;
    tasks: Array<Task>;

    constructor(
        private appPages: AppPages,
        private location: Location,
        private taskService: TaskService,
        private popoverController: PopoverController) {
        this.tasks = this.taskService.getFakeTasks();
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }

    async showDatePickerForTask(index: number): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: PopoverDatePickerComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { date: this.tasks[index].deadline },
            cssClass: 'popover-date-picker'
        });

        return datePopover.present();
    }

    assignUserToTask(index: number) {

    }

    goToTaskDetails(index: number) {

    }
}

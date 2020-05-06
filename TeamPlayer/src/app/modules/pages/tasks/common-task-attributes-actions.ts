import { Task } from '../../../models/task';
import { PopoverDatePickerComponent } from '../../../components/popover-date-picker/popover-date-picker.component';
import { PopoverController } from '@ionic/angular';
import { TaskAssignComponent } from '../../../components/task-assign/task-assign.component';
import { TaskService } from '../../../services/task.service';
import { AppInjectorService } from '../../../services/app-injector.service';
import { User } from '../../../models/user';

export abstract class CommonTaskAttributesActions {

    protected popoverController: PopoverController;
    protected taskService: TaskService;

    protected constructor() {
        this.popoverController = AppInjectorService.injector.get(PopoverController);
        this.taskService = AppInjectorService.injector.get(TaskService);
    }

    async showDatePickerForTask(task: Task): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: PopoverDatePickerComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { task: task },
            cssClass: 'popover-date-picker'
        });

        return datePopover.present();
    }


    async assignUsersToTask(task: Task): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: TaskAssignComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: {
                task: task,
                editAssignedUsersState: true,
            },
            cssClass: 'task-assign-popover'
        });

        datePopover.onDidDismiss().then(data => {
            console.log(data, task.assignees);
            task.assignees = Array.from(<Set<User>>data.data);
            console.log(task.assignees);
            this.taskService.updateTask(task);
        });

        return datePopover.present();
    }

}
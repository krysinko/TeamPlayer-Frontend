import { Task } from '../../../models/task';
import { PopoverDatePickerComponent } from '../../../components/popover-date-picker/popover-date-picker.component';
import { PopoverController } from '@ionic/angular';
import { TaskAssignComponent } from '../../../components/task-assign/task-assign.component';

export class CommonTaskAttributesActions {

    constructor(private popoverController: PopoverController) {
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

        return datePopover.present();
    }

}
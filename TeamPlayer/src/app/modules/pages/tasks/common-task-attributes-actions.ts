import { Task, TaskStatus } from '../../../models/task';
import { PopoverDatePickerComponent } from '../../../components/popover-date-picker/popover-date-picker.component';
import { PopoverController } from '@ionic/angular';
import { TaskAssignComponent } from '../../../components/task-assign/task-assign.component';
import { TaskService } from '../../../services/task.service';
import { AppInjectorService } from '../../../services/app-injector.service';
import { User } from '../../../models/user';
import { TaskLabels } from '../../../models/texts/taskDescriptions';
import { BehaviorSubject } from 'rxjs';

export abstract class CommonTaskAttributesActions {

    taskStatusKeys: string[] = Object.keys(TaskStatus);
    taskLabels: typeof TaskLabels = TaskLabels;
    newTaskAsignees: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
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


    async assignUsersToTask(task: Task, teamMembers: BehaviorSubject<User[]> = null): Promise<void> {
        let properties: object;
        if (!teamMembers) {
            properties = {
                task: task,
                editAssignedUsersState: true,
            };
        } else {
            properties = {
                editAssignedUsersState: false,
                teamList$: teamMembers,
            };
        }
        const assigneesPopover = await this.popoverController.create({
            component: TaskAssignComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: properties,
            cssClass: 'task-assign-popover'
        });

        assigneesPopover.onDidDismiss().then(data => {
            if (data && data.data && properties['editAssignedUsersState']) {
                console.log(data, task.assignees);
                task.assignees = Array.from(<Set<User>> data.data);
                console.log(task.assignees);
                this.taskService.updateTask(task);
            } else if (data && data.data) {
                console.log(data.data);
                this.newTaskAsignees.next(Array.from(<Set<User>> data.data));
            }
        });

        return assigneesPopover.present();
    }

}

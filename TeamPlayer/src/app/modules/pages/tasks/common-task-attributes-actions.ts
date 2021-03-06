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
    newTaskDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
    protected popoverController: PopoverController;
    protected taskService: TaskService;

    protected constructor() {
        this.popoverController = AppInjectorService.injector.get(PopoverController);
        this.taskService = AppInjectorService.injector.get(TaskService);
    }

    async showDatePickerForTask(task: Task, newTask: boolean = false): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: PopoverDatePickerComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { task: task, isNewTask: newTask},
            cssClass: 'popover-date-picker'
        });

        if (newTask) {
            datePopover.onDidDismiss().then(data => {
                if (data.data) {
                    this.newTaskDate.next(<Date>data.data);
                }
            });
        }

        return datePopover.present();
    }


    async assignUsersToTask(task: Task, teamMembers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null)): Promise<void> {
        let properties: any;
        if (!teamMembers.value) {
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
            if (data && data.data && properties.editAssignedUsersState) {
                task.assignees = Array.from(<Set<User>> data.data);
                this.taskService.updateTask(task);
            } else if (data && data.data) {
                this.newTaskAsignees.next(Array.from(<Set<User>> data.data));
            }
        });

        return assigneesPopover.present();
    }

}

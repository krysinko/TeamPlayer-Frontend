import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../../../../services/task.service';
import { Task, TaskStatus } from '../../../../models/task';
import { BehaviorSubject } from 'rxjs';
import { TaskLabels } from '../../../../models/texts/taskDescriptions';
import { CommonTaskAttributesActions } from '../common-task-attributes-actions';
import { IonTextarea, PopoverController } from '@ionic/angular';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';


@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: [ './task-details.page.scss' ],
})
export class TaskDetailsPage extends CommonTaskAttributesActions {

    get statusLabel(): string {
        let label: string = '';
        Object.keys(TaskStatus).forEach((statusKey: TaskStatus) => {
            if (TaskStatus[statusKey] === this.task$.getValue().status) {
                label = TaskLabels[statusKey];
            }
        });
        return label;
    }

    @ViewChild('taskDescriptionTextarea', { read: IonTextarea, static: false }) taskDescriptionInput: IonTextarea;

    task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
    taskStatusKeys: string[] =  Object.keys(TaskStatus);
    taskLabels: typeof TaskLabels = TaskLabels;
    taskStatuses: typeof TaskStatus = TaskStatus;
    users: User[];
    descriptionHasChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private taskId: number;

    constructor(private route: ActivatedRoute, private taskService: TaskService, popoverController: PopoverController, private userService: UserService) {
        super(popoverController);
        this.users = this.userService.getTeamMembers();
        this.getTaskSubscriptionByIdParam();
    }

    updateStatus(): void {

    }

    getUsernameById(id: number): string {
        return this.users.find((u: User) => u.id === id).username;
    }

    clearTaskDescription() {
        this.taskDescriptionInput.value = '';
        this.setFocusOnDescriptionTexarea();
    }

    saveTaskDescription() {
        const task: Task = this.task$.getValue();
        task.content = this.taskDescriptionInput.value;
        console.log(task);
        this.taskService.updateTask(task);
    }

    setDescriptionChangedFlag() {
        this.descriptionHasChanged$.next(true);
    }

    setFocusOnDescriptionTexarea() {
        this.taskDescriptionInput.setFocus();
    }

    private getTaskSubscriptionByIdParam(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    this.taskId = Number(params.get('id'));
                    return this.taskService.getTask(this.taskId);
                })
            )
            .subscribe((t: Task) => {
                this.task$.next(t);
            });
    }
}

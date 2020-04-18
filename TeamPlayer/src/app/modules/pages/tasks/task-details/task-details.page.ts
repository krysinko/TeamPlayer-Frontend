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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

    @ViewChild('taskDescriptionTextarea', { read: IonTextarea, static: false }) taskContentInput: IonTextarea;

    task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
    taskStatusKeys: string[] =  Object.keys(TaskStatus);
    taskLabels: typeof TaskLabels = TaskLabels;
    taskStatuses: typeof TaskStatus = TaskStatus;
    users: User[];
    contentHasChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    taskContentFormGroup: FormGroup;
    private taskId: number;

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        popoverController: PopoverController,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        super(popoverController);
        this.users = this.userService.getTeamMembers();
        this.getTaskSubscriptionByIdParam();
    }

    updateStatus(): void {

    }

    getUsernameById(id: number): string {
        return this.users.find((u: User) => u.id === id).username;
    }

    clearTaskDescription(): void {
        this.taskContentFormGroup.setValue({content: ''});
        this.setFocusOnDescriptionTextarea();
    }

    saveTaskDescription(): void {
        this.taskService.updateTask({
            ...this.task$.getValue(),
            content: this.taskContentFormGroup.controls['content'].value
        });
        this.contentHasChanged$.next(false);
    }

    setDescriptionChangedFlag(): void {
        this.contentHasChanged$.next(true);
    }

    setFocusOnDescriptionTextarea(): void {
        this.taskContentInput.setFocus();
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
                this.buildTaskContentForm();
            });
    }

    private buildTaskContentForm() {
        this.taskContentFormGroup = this.formBuilder.group({
            content: [
                this.task$.getValue().content || '',
                Validators.maxLength(255)
            ]
        });
    }
}

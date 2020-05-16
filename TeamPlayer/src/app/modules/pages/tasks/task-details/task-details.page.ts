import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../../../../services/task.service';
import { Task, TaskStatus } from '../../../../models/task';
import { BehaviorSubject } from 'rxjs';
import { TaskLabels } from '../../../../models/texts/taskDescriptions';
import { CommonTaskAttributesActions } from '../common-task-attributes-actions';
import { IonInput, IonTextarea, PopoverController } from '@ionic/angular';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../models/project';


@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: [ './task-details.page.scss' ],
})
export class TaskDetailsPage extends CommonTaskAttributesActions {
    taskFormData: FormGroup;

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
    @ViewChild('titleInputElement', { read: IonInput, static: false }) taskTitleInput: IonInput;

    task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
    taskStatusKeys: string[] =  Object.keys(TaskStatus);
    taskLabels: typeof TaskLabels = TaskLabels;
    taskStatuses: typeof TaskStatus = TaskStatus;
    users: User[];
    contentHasChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    titleHasChanged$: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
    taskContentFormGroup: FormGroup;
    taskTitleFormGroup: FormGroup;
    private taskId: number;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        super();
        this.subscribeOnSingleTaskFromService();
        this.getTaskByIdParam();
    }

    updateStatus($event: CustomEvent): void {
        // console.log($event.detail.value);
        // const task: Task = {
        //     ...this.task$.getValue(),
        //     status: $event.detail.value
        // };
        // this.taskService.updateTask(task);
        // this.task$.next(task);
    }

    getUsernameById(id: number): string {
        return this.users.find((u: User) => u.id === id).username;
    }

    clearTaskDescription(): void {
        this.taskContentFormGroup.setValue({content: ''});
        this.setFocusOnDescriptionTextarea();
    }

    saveTaskDescription(): void {
        // this.taskService.updateTask({
        //     ...this.task$.getValue(),
        //     content: this.taskContentFormGroup.controls['content'].value
        // });
        // this.taskContentFormGroup.controls['content'].markAsPristine();
    }

    setFocusOnDescriptionTextarea(): void {
        this.taskContentInput.setFocus();
    }

    clearTitleInput(): void {
        this.taskTitleFormGroup.setValue({title: ''});
        this.taskTitleInput.setFocus();
    }

    saveNewTitle(): void {
        // this.taskService.updateTask({
        //     ...this.task$.getValue(),
        //     title: this.taskTitleFormGroup.controls['title'].value
        // });
        // this.taskTitleFormGroup.controls['title'].markAsPristine();
    }

    private getTaskByIdParam(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    this.taskId = Number(params.get('id'));
                    return this.taskService.getTask(this.taskId);
                })
            )
            .subscribe((t: Task) => {
                this.buildTaskDataForm();
            });
    }

    private buildTaskDataForm(): void {
        const task: Task = this.task$.getValue();
        this.taskFormData = this.formBuilder.group({
            title: [
                task.title || '',
                Validators.maxLength(255)
            ],
            content: [
                task.content || '',
                Validators.maxLength(255)
            ],
            deadline: task.deadline,
            status: task.status,
            project: task.project.id,
            assignees: task.assignees,
        });
        this.subscribeOnFormValueChangesToUpdateTask();
    }

    private subscribeOnSingleTaskFromService(): void {
        this.taskService.singleTask$.subscribe((task: Task) => {
            this.task$.next(task);
            if (task && this.taskFormData) {
                this.taskFormData.patchValue(task);
            }
        });
    }

    private subscribeOnFormValueChangesToUpdateTask() {
        this.taskFormData.valueChanges.subscribe((data: any) => {
            console.log(data);
            // this.task$.next({...this.task$.value, ...data});
            this.taskService.updateTask({...this.task$.value, ...data});
        });
    }
}

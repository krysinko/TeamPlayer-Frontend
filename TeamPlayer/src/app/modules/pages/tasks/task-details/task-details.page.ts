import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, skipWhile, switchMap } from 'rxjs/operators';
import { TaskService } from '../../../../services/task.service';
import { Task, TaskStatus } from '../../../../models/task';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskLabels } from '../../../../models/texts/taskDescriptions';
import { IonInput, IonTextarea } from '@ionic/angular';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ProjectService } from '../../../../services/project.service';


@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: [ './task-details.page.scss' ],
})
export class TaskDetailsPage {

    get statusLabel(): string {
        let label: string = '';
        Object.keys(TaskStatus).forEach((statusKey: TaskStatus) => {
            if (TaskStatus[statusKey] === this.task$.getValue().status) {
                label = TaskLabels[statusKey];
            }
        });
        return label;
    }
    taskFormData: FormGroup;

    @ViewChild('taskDescriptionTextarea', { read: IonTextarea, static: false }) taskContentInput: IonTextarea;
    @ViewChild('titleInputElement', { read: IonInput, static: false }) taskTitleInput: IonInput;

    task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
    taskStatusKeys: string[] =  Object.keys(TaskStatus);
    taskLabels: string[] = Object.values(TaskLabels);
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
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private projectService: ProjectService
    ) {
        this.getTaskByIdParam()
            .subscribe((t: Task) => {
                this.subscribeOnSingleTaskFromService();
                this.buildTaskDataForm();
                this.subscribeOnFormValueChangesToUpdateTask();
            });
    }

    getUsernameById(id: number): string {
        return this.users.find((u: User) => u.id === id).username;
    }

    clearTaskDescription(): void {
        this.taskContentFormGroup.setValue({content: ''});
        this.setFocusOnDescriptionTextarea();
    }

    setFocusOnDescriptionTextarea(): void {
        this.taskContentInput.setFocus();
    }

    clearTitleInput(): void {
        this.taskTitleFormGroup.setValue({title: ''});
        this.taskTitleInput.setFocus();
    }

    getProjectMembers(): Observable<User[]> {
        return this.projectService.getProjectTeamMembers(this.task$.value.project)
            .pipe(map((users: User[]) => {
                return users;
            }));
    }

    patchTitleValue(): void {
        this.titleHasChanged$.next(true);
    }

    private getTaskByIdParam(): Observable<Task> {
        return this.route.paramMap
            .pipe(
                skipWhile(_.isNil),
                switchMap((params: ParamMap) => {
                    this.taskId = Number(params.get('id'));
                    return this.taskService.getTask(this.taskId);
                })
            );
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
            project: task.project,
            assignees: [task.assignees],
        });
    }

    private subscribeOnSingleTaskFromService(): void {
        this.taskService.singleTask$.subscribe((task: Task) => {
            this.task$.next(task);
            if (task && this.taskFormData && !_.isEqual(this.task$.value, task)) {
                this.taskFormData.patchValue(task);
            }
        });
    }

    private subscribeOnFormValueChangesToUpdateTask() {
        this.taskFormData.valueChanges.subscribe((data: Task) => {
            console.log(this.taskFormData, data, this.task$.value);
            console.log(this.taskFormData.controls['title'].dirty, !this.taskFormData.controls['title'].valid, this.titleHasChanged$.value);
            if (!this.taskFormData.controls['title'].dirty && !this.titleHasChanged$.value) {
                return;
            } else {
                this.taskService.updateTask({ ...this.task$.value, ...data, });
                this.titleHasChanged$.next(false);
            }
        });
    }
}

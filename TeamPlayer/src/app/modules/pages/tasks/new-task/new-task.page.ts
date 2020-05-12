import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonTaskAttributesActions } from '../common-task-attributes-actions';
import { Task, TaskProgressInStartToEndOrder, TaskStatus } from '../../../../models/task';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project';
import { User } from '../../../../models/user';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskApiService } from '../../../../services/api/task-api.service';
import {
    apiErrorMessage, dataNotFoundErrorMessage,
    forbiddenErrorMessage,
    unauthorizedErrorMessage
} from '../../../../models/texts/taskDescriptions';
import { Router } from '@angular/router';
import { TaskService } from '../../../../services/task.service';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.page.html',
    styleUrls: [ './new-task.page.scss' ],
})
export class NewTaskPage extends CommonTaskAttributesActions implements OnInit {
    taskFormGroup: FormGroup;
    task: Task = {
        ...new Task(),
        deadline: new Date(Date.now()),
        status: <TaskStatus> TaskProgressInStartToEndOrder[0],
    };
    userProjects: Project[];
    teamMembers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

    constructor(
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private taskApiService: TaskApiService,
        private router: Router
    ) {
        super();
        this.getUsersProjects();
        this.buildTaskForm();
        this.subscribeOnDatePickerValue();
        this.subscribeOnNewAssigneesValue();
    }

    ngOnInit() {
    }

    saveTask() {
        this.task = {...this.taskFormGroup.value, ...this.task};
        console.log(this.task, this.taskFormGroup.value);
        // this.taskService.getTasks().pipe(
        //     map((tasks: Task[]) => {
        //         newTaskId = tasks.length;
        //     }),
        //     switchMap(() => this.postNewTask(newTaskId)),
        //     catchError((err: HttpErrorResponse) => console.log)
        // );

        this.taskApiService.postNewTask(this.task)
            .pipe(
                switchMap(() => this.taskService.getTasks()),
                catchError(this.handleApiError)).subscribe((data: Task) => {
            this.router.navigate(['/tasks']);
        });
    }

    resetAssignedUsersAndTeamMembers($event: CustomEvent): void {
        this.taskFormGroup.controls['assignees'].reset();
        this.newTaskAsignees.next([]);
        this.getTeamMembers($event);
    }

    private getTeamMembers($event: CustomEvent): void {
        this.projectService.getProjectTeamMembers($event.detail.value).subscribe((users: User[]) => {
            this.teamMembers$.next(users);
        });
    }

    private getUsersProjects(): void {
        this.projectService.getUsersProjects().pipe().subscribe((projects: Project[]) => {
            this.userProjects = projects;
        });
    }

    private buildTaskForm(): void {
        this.taskFormGroup = this.formBuilder.group({
            title: [ this.task.title, [ Validators.required, Validators.maxLength(255) ] ],
            deadline: [ this.task.deadline, Validators.required ],
            status: [ this.task.status, Validators.required ],
            assignees: [],
            content: [ '', [ Validators.maxLength(255) ] ],
            project: [ '', Validators.required ],
        });
    }

    private subscribeOnDatePickerValue(): void {
        this.newTaskDate.subscribe((value: Date) => {
            this.taskFormGroup.patchValue({ deadline: value });
            this.task.deadline = value;
        });
    }

    private subscribeOnNewAssigneesValue(): void {
        this.newTaskAsignees.subscribe((assignees: User[]) => {
            this.taskFormGroup.patchValue({ assignees: assignees });
            this.task.assignees = assignees;
        });
    }

    private postNewTask(newTaskId: number) {
        this.task.id = newTaskId;
        console.log(this.task);
        return of();
    }

    private handleApiError(err: HttpErrorResponse): Observable<any> {
        console.log(err);
        let message: string;
        let userLoginStatus: boolean;
        switch (err.status) {
            case 500:
                message = apiErrorMessage;
                break;
            case 401:
                message = unauthorizedErrorMessage;
                // userLoginStatus = this.checkIfUserLoggedIn() || false;
                break;
            case 403:
                message = forbiddenErrorMessage;
                // userLoginStatus = this.checkIfUserLoggedIn() || false;
                break;
            case 404:
                message = dataNotFoundErrorMessage;
                break;
        }
        return of();
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonTaskAttributesActions } from '../common-task-attributes-actions';
import { Task, TaskProgressInStartToEndOrder, TaskStatus } from '../../../../models/task';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project';
import { User } from '../../../../models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskApiService } from '../../../../services/api/task-api.service';
import {
    apiErrorMessage,
    dataNotFoundErrorMessage,
    forbiddenErrorMessage,
    TaskLabels,
    unauthorizedErrorMessage
} from '../../../../models/texts/taskDescriptions';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.page.html',
    styleUrls: [ './new-task.page.scss' ],
})
export class NewTaskPage extends CommonTaskAttributesActions implements OnInit {
    taskFormGroup: FormGroup;
    task: Task = {
        ...new Task(),
        status: <TaskStatus> TaskProgressInStartToEndOrder[0],
    };
    userProjects: Project[];
    projectNames: string[];
    taskLabels: string[] = Object.values(TaskLabels);

    constructor(
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private taskApiService: TaskApiService,
        private router: Router,
        private userService: UserService
    ) {
        super();
        this.getUsersProjects();
        this.buildTaskForm();
    }

    ngOnInit() {
    }

    saveTask(): void {
        this.task = { ...this.taskFormGroup.value };
        console.log(this.task, this.taskFormGroup.value);
        this.userService.getUserData()
            .subscribe((user: User) => {
                this.task.creator = user;
                this.taskService.postTaskToApi(this.task);
            });
    }

    private getUsersProjects(): void {
        this.projectService.getUsersProjects().pipe().subscribe((projects: Project[]) => {
            this.userProjects = projects;
            this.projectNames = [];
            Object.values(projects).forEach((p: Project) => this.projectNames.push(p.name));
        });
    }

    private buildTaskForm(): void {
        this.taskFormGroup = this.formBuilder.group({
            title: [ '', [ Validators.required, Validators.maxLength(255) ] ],
            deadline: [ '', Validators.required ],
            status: [ '', Validators.required ],
            assignees: [],
            content: [ '', [ Validators.maxLength(255) ] ],
            project: [ '', Validators.required ],
        });
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

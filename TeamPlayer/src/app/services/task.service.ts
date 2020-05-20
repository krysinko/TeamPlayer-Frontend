import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { SortOption, Task, TaskProgressInStartToEndOrder } from '../models/task';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TaskApiService } from './api/task-api.service';
import { catchError, map, skipWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
    apiErrorMessage,
    dataNotFoundErrorMessage,
    forbiddenErrorMessage,
    unauthorizedErrorMessage
} from '../models/texts/taskDescriptions';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    get tasks$(): Observable<Task[]> {
        return this._tasks$.asObservable();
    }

    set tasks(data: Task[]) {
        this._tasks$.next(data);
    }

    set singleTaskValue(value: Task) {
        this.singleTask$.next(value);
    }

    static compareDate(t1: Task, t2: Task, order: 'asc' | 'desc') {
        return (new Date(t1.deadline).getTime() - new Date(t2.deadline).getTime()) * (order === 'asc' ? 1 : -1);
    }

    static compareTaskStatus(t1: Task, t2: Task, order: 'asc' | 'desc') {
        console.log(TaskProgressInStartToEndOrder, TaskProgressInStartToEndOrder.indexOf(t1.status), TaskProgressInStartToEndOrder.indexOf(t2.status));
        return (TaskProgressInStartToEndOrder.indexOf(t1.status) - TaskProgressInStartToEndOrder.indexOf(t2.status)) * (order === 'asc' ? 1 : -1);
    }

    static getRandomNumber(min = 0, max = 30): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    singleTask$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);

    private _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

    constructor(private taskApi: TaskApiService, private userService: UserService, private router: Router) {
        this.getTasks();
    }

    sortTasks(options: SortOption): void {
        let tasksSorted: Task[] = this._tasks$.getValue();
        if (options.property === 'status') {
            tasksSorted = tasksSorted.sort((t1: Task, t2: Task) => TaskService.compareTaskStatus(t1, t2, options.order));
        } else if (options.property === 'deadline' || options.property === 'createdAt') {
            tasksSorted = tasksSorted.sort((t1: Task, t2: Task) => TaskService.compareDate(t1, t2, options.order));
        } else {
            tasksSorted = _.orderBy(tasksSorted, [ options.property ], [ options.order ]);
        }

        this.tasks = tasksSorted;
    }

    getTask(taskId: number): Observable<Task> {
        return this.taskApi.getTaskFromApi(taskId)
            .pipe(
                skipWhile(_.isNil),
                map((t: Task) => {
                    this.singleTaskValue = t;
                }),
                catchError((err: HttpErrorResponse) => this.handleApiError(err))
            );
    }

    getTasks(): Observable<Task[]> {
        this.taskApi.getTasksFromApi()
            .pipe(catchError(this.handleApiError))
            .subscribe((value: Task[]) => {
                this.tasks = value;
            });
        return this.tasks$;

        // return this.taskApi.getTasksFromApi().pipe(
        //     map((value: Task[]) => {
        //         this._tasks$.next(value);
        //         console.log(value);
        //         return value;
        //     }),
        //     catchError(this.handleApiError)
        // );
    }

    updateTask(task: Task): void {
        this.taskApi.update(task)
            .pipe(
                map((t: Task) => {
                    this.singleTaskValue = t;
                }),
                catchError(this.handleApiError))
            .subscribe(() => {
                this.getTasks();
            });
    }

    async getTaskProjectTeamMembers(id: number): Promise<User[]> {
        const task = await this.getTask(id).toPromise();
        return task.project.users;
    }

    private checkIfUserLoggedIn(): boolean {
        if (!this.userService.userLoggedIn$.getValue()) {
            return true;
        }
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
                userLoginStatus = this.checkIfUserLoggedIn();
                break;
            case 403:
                message = forbiddenErrorMessage;
                userLoginStatus = this.checkIfUserLoggedIn();
                break;
            case 404:
                message = dataNotFoundErrorMessage;
                break;
        }
        return of();
    }
}

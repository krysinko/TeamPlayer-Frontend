import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { SortOption, Task, TaskProgressInStartToEndOrder } from '../models/task';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TaskApiService } from './api/task-api.service';
import { catchError, switchMap } from 'rxjs/operators';
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

    private _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

    constructor(private taskApi: TaskApiService, private userService: UserService, private router: Router) {
        this.getTasks();
    }

    update(task: Task): void {
        const tasks: Task[] = this._tasks$.getValue();
        const taskToUpdate: Task = tasks.find((t: Task) => t.id === task.id);
        const updatingIndex: number = tasks.indexOf(taskToUpdate);
        tasks[updatingIndex] = taskToUpdate;
        this._tasks$.next(tasks);
    }

    sortTasks(options: SortOption): void {
        console.log(options.property, options.order);
        let tasksSorted: Task[] = this._tasks$.getValue();
        if (options.property === 'status') {
            tasksSorted = tasksSorted.sort((t1: Task, t2: Task) => TaskService.compareTaskStatus(t1, t2, options.order));
        } else if (options.property === 'deadline' || options.property === 'createdAt') {
            tasksSorted = tasksSorted.sort((t1: Task, t2: Task) => TaskService.compareDate(t1, t2, options.order));
        } else {
            tasksSorted = _.orderBy(tasksSorted, [ options.property ], [ options.order ]);
        }
        console.log(tasksSorted);

        this._tasks$.next(tasksSorted);
    }

    getTask(taskId: number): Observable<Task> {
        return this.taskApi.getTaskFromApi(taskId);
    }

    getTasks(): void {
        this.taskApi.getTasksFromApi().subscribe((value: Task[]) => {
            this._tasks$.next(value as Task[]);
        });
    }

    updateTask(task: Task) {
        this.taskApi.update(task)
            .pipe(
                switchMap((t: Task, i: any) => of(this.getTasks())),
                catchError((err: HttpErrorResponse) => {
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
                })
            )
            .subscribe((tasks: Task[]) => {
                this._tasks$.next(tasks);
        });
    }

    getTaskProjectTeamMembers(id: number): User[] {
        let users: User[];
        this.getTask(id)
            .subscribe((task: Task) => {
               users = task.project.users;
            });
        return users;
    }

    private getAssignedUsersRandomValue(): number[] {
        const numberOfUsers: number = 7;
        if (TaskService.getRandomNumber(0, 1)) {
            const numberOfUsersAssigned: number = TaskService.getRandomNumber(1, numberOfUsers);
            const users: number[] = [];
            for (let i = 0; i < numberOfUsers; i++) {
                users.push(TaskService.getRandomNumber(0, numberOfUsers - 1));
            }
            return users.filter((usr, index, u) => u.indexOf(usr) === index);
        } else {
            return null;
        }
    }

    private checkIfUserLoggedIn(): boolean {
        if (!this.userService.userLoggedIn$.getValue()) {
            return true;
        }
    }
}

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { SortOption, Task, TaskProgressInStartToEndOrder, TaskStatus } from '../models/task';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    get tasks$(): Observable<Task[]> {
        return this._tasks$.asObservable();
    }

    static compareDeadlines(t1: Task, t2: Task) {
        return t1.deadline.getTime() - t2.deadline.getTime();
    }

    static compareTaskStatus(t1: Task, t2: Task, order: 'asc' | 'desc') {
        return (TaskProgressInStartToEndOrder.indexOf(t1.status) - TaskProgressInStartToEndOrder.indexOf(t2.status)) * (order === 'asc' ? 1 : -1);
    }

    private _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

    constructor() {
        this.getFakeTasks();
    }

    update(task: Task): void {
        const tasks: Task[] = this._tasks$.getValue();
        const taskToUpdate: Task = tasks.find((t: Task) => t.id === task.id);
        const updatingIndex: number = tasks.indexOf(taskToUpdate);
        tasks[updatingIndex] = taskToUpdate;
        this._tasks$.next(tasks);
    }

    sortTasks(options: SortOption): void {
        let tasksSorted: Task[] = this._tasks$.getValue();
        if (options.property === 'status') {
            tasksSorted = tasksSorted.sort((t1: Task, t2: Task) => TaskService.compareTaskStatus(t1, t2, options.order));
        } else {
            tasksSorted = _.orderBy(tasksSorted, [ options.property, options.order ]);
        }
        console.log(tasksSorted);

        this._tasks$.next(tasksSorted);
    }

    // TODO Observable<Task>
    getTask(taskId: number): Observable<Task> {
        return of(this._tasks$.getValue().find(t => t.id === taskId));
    }

    private getFakeTasks(): Task[] {
        const tasks: Task[] = [];
        for (let i = 1; i < this.getRandomNumber(8, 15); i++) {
            const smallTask: Task = new Task();
            smallTask.id = i;
            smallTask.title = i + ' title';
            smallTask.content = i + ' content';
            smallTask.deadline = new Date();
            smallTask.createdAt = new Date();
            smallTask.deadline.setDate(smallTask.deadline.getDate() + this.getRandomNumber(100, 3000));
            smallTask.createdAt.setDate(smallTask.createdAt.getDate() - this.getRandomNumber(100, 3000));
            smallTask.status = _.sample(Object.values(TaskStatus)) as TaskStatus;
            smallTask.assignedUsers = this.getAssignedUsersRandomValue();
            tasks.push(smallTask);
        }
        this._tasks$.next(tasks.sort(TaskService.compareDeadlines));
        return tasks;
    }

    private getRandomNumber(min = 0, max = 30): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private getAssignedUsersRandomValue(): number[] {
        const numberOfUsers: number = 7;
        if (this.getRandomNumber(0, 1)) {
            const numberOfUsersAssigned: number = this.getRandomNumber(1, numberOfUsers);
            const users: number[] = [];
            for (let i = 0; i < numberOfUsers; i++) {
                users.push(this.getRandomNumber(0, numberOfUsers - 1));
            }
            return users;
        } else {
            return null;
        }
    }
}

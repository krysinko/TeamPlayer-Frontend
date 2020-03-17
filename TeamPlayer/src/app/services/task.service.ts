import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Task, TaskStatus } from '../models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    tasks: Task[];

    constructor() {}

    getFakeTasks(): Task[] {
        const tasks: Task[] = [];
        for (let i = 1; i < this.getRandomNumber(8, 15); i++) {
            const smallTask: Task = new Task();
            smallTask.id = i;
            smallTask.title = i + ' title';
            smallTask.content = i + ' content';
            smallTask.deadline = new Date();
            smallTask.deadline.setDate(smallTask.deadline.getDate() + this.getRandomNumber(100, 3000));
            smallTask.status = _.sample(Object.values(TaskStatus)) as TaskStatus;
            tasks.push(smallTask);
        }
        this.tasks = tasks.sort(this.compareDeadlines);
        return tasks;
    }

    private getRandomNumber(min = 0, max = 30): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private compareDeadlines(t1: Task, t2: Task) {
        return t1.deadline.getTime() - t2.deadline.getTime();
    }
}

import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../models/app-pages';
import { Location } from '@angular/common';
import { Task } from 'src/app/models/task';
import * as faker from 'ng-faker';
import { TaskService } from '../../services/task.service';
@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: [ './tasks.page.scss' ],
})
export class TasksPage implements OnInit {
    title: string;
    tasks: Array<Task>;

    constructor(private appPages: AppPages, private location: Location, private taskService: TaskService) {
        this.tasks = this.taskService.getFakeTasks();
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: [ './task-details.page.scss' ],
})
export class TaskDetailsPage implements OnInit {
    task$: Observable<Task>;
    private taskId: number;

    constructor(private route: ActivatedRoute, private taskService: TaskService) {
        this.subscribeOnTaskWithParamMap();
    }

    ngOnInit() {
    }

    private subscribeOnTaskWithParamMap(): void {
        this.task$ = this.route.paramMap
        .pipe(
            switchMap((params: ParamMap) => {
                this.taskId = Number(params.get('id'));
                return this.taskService.getTask(this.taskId);
            })
        );
    }
}

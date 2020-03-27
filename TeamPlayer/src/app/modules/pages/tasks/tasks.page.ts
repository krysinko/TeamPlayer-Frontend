import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';
import { Task } from 'src/app/models/task';
import { TaskService } from '../../../services/task.service';
import { PopoverController } from '@ionic/angular';
import { PopoverDatePickerComponent } from '../../../components/popover-date-picker/popover-date-picker.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TaskAssignComponent } from '../../../components/task-assign/task-assign.component';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: [ './tasks.page.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage implements OnInit, OnDestroy {
    title: string;
    tasks$: Observable<Task[]>;
    showListOptions$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    showSortOptions$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // showListOptions$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private appPages: AppPages,
        private location: Location,
        private taskService: TaskService,
        private popoverController: PopoverController) {
        this.tasks$ = this.taskService.tasks$;
        // this.subscribeOnTasks();
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }


    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
    }

    async showDatePickerForTask(task: Task): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: PopoverDatePickerComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { task: task },
            cssClass: 'popover-date-picker'
        });

        return datePopover.present();
    }

    async assignUserToTask(task: Task): Promise<void> {
        const datePopover = await this.popoverController.create({
            component: TaskAssignComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: { task: task },
            cssClass: 'task-assign-popover'
        });

        return datePopover.present();
    }

    goToTaskDetails(index: number) {

    }

    // toggleListOptions(): void {
    //     this.showListOptions$.next(!this.showListOptions$.getValue());
    // }
    //
    // toggleSortOptions(): void {
    //     this.showSortOptions$.next(!this.showSortOptions$.getValue());
    // }

    private getTask(index: number): Observable<Task> {
        return this.tasks$.pipe(map((arr: Task[]) => arr.find((t: Task) => t.id === index)));
    }

    private subscribeOnTasks(): void {
        this.taskService.tasks$.pipe(takeUntil(this.componentDestroyed$)).subscribe((data: Task[]) => {
            console.log(data);
            // this.tasks = data;
        });
    }
}

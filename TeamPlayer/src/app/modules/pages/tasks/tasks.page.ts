import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';
import { SortOption, Task, TaskSortOptions } from 'src/app/models/task';
import { TaskService } from '../../../services/task.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { PopoverDatePickerComponent } from '../../../components/popover-date-picker/popover-date-picker.component';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TaskAssignComponent } from '../../../components/task-assign/task-assign.component';
import { AlertInput } from '@ionic/core';
import { isEqual } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

export class SortAlertInput extends SortOption implements AlertInput {
    type: 'radio';
    value: string;
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: [ './tasks.page.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage implements OnInit, OnDestroy {
    title: string;
    tasks$: Observable<Task[]>;
    sortOption: SortOption;

    // showListOptions$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // showSortOptions$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // showListOptions$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private alertController: AlertController,
        private appPages: AppPages,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private popoverController: PopoverController) {
        this.tasks$ = this.taskService.tasks$;
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

    async showSortOptions(): Promise<void> {
        const inputsArr: SortAlertInput[] = TaskSortOptions.map((opt: SortOption) => {
            return {
                ...opt,
                type: 'radio',
                name: opt.property,
                value: opt.property + '-' + opt.order,
                checked: isEqual(opt, this.sortOption),
                handler: () => {
                    this.sortOption = opt;
                },
            };
        });
        const sortOptionsAlert = await this.alertController.create({
            header: 'Sortuj według:',
            inputs: inputsArr,
            buttons: [
                {
                    text: 'Anuluj',
                    role: 'cancel',
                    handler: () => this.alertController.dismiss(),
                },
                {
                    text: 'Sortuj',
                    handler: () => this.alertController.dismiss(),
                }
            ],
            animated: true,
            backdropDismiss: true,
            cssClass: 'sort-options-alert'
        });

        sortOptionsAlert.onDidDismiss().then(() => {
            if (this.sortOption) {
                this.taskService.sortTasks(this.sortOption);
            }
        });

        return sortOptionsAlert.present();
    }

    goToTaskDetails(id: number) {
        this.router.navigate([ 'task-details/' + id ], { relativeTo: this.route });
    }

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
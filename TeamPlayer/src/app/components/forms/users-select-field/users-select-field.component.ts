import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NgControl } from '@angular/forms';
import { ControlValueCore } from '../control-value-core';
import { User } from '../../../models/user';
import { Task } from '../../../models/task';
import { BehaviorSubject } from 'rxjs';
import { TaskAssignComponent } from '../../task-assign/task-assign.component';

@Component({
    selector: 'app-users-select-field',
    templateUrl: './users-select-field.component.html',
    styleUrls: [ './users-select-field.component.scss' ],
})
export class UsersSelectFieldComponent extends ControlValueCore {
    set value(v: User[]) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
            this.onTouch(v);
        }
    }

    get value() {
        return this._value;
    }

    @Input() projectId: number;
    @Input() label: string = 'Assigned users';

    _value: User[] = [];

    constructor(private popoverController: PopoverController, public ngControl: NgControl) {
        super(ngControl);
    }

    setDisabledState(isDisabled: boolean): void {

    }

    async openAssignmentPopover(): Promise<void> {
        const assigneesPopover = await this.popoverController.create({
            component: TaskAssignComponent,
            animated: true,
            backdropDismiss: true,
            componentProps: {
                projectId: this.projectId,
                assignees: this.value
            },
            cssClass: 'task-assign-popover'
        });

        assigneesPopover.onDidDismiss().then(data => {
            console.log(data);
            if (data && data.data) {
                this.value = Array.from(<Set<User>> data.data);
            }
        });

        return assigneesPopover.present();
    }
}

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Change } from '@ionic/angular-toolkit/schematics/util/change';
import { PopoverController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { remove } from 'lodash';

@Component({
    selector: 'app-task-assign',
    templateUrl: './task-assign.component.html',
    styleUrls: [ './task-assign.component.scss' ],
})
export class TaskAssignComponent implements OnInit {
    @Input() task: Task;
    teamList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    assignedUsers: Map<number, User> = new Map();
    editAssignedUsersState: boolean = false;

    constructor(private userService: UserService, private popoverController: PopoverController, private taskService: TaskService, private chengeDetector: ChangeDetectorRef) {
        this.setSubscriptionForUsers();
    }

    ngOnInit() {
        if (this.task && this.task.assignees) {
            this.editAssignedUsersState = true;
            this.assignedUsers = new Map<number, User>();
            // this.task.assignees.forEach((usr: number, index: number) => {
            //     this.assignedUsers.set(index, this.teamList$.getValue().find((u: User) => u.id === usr));
            // });
            console.log(this.assignedUsers);
        }
    }

    // todo should handle observable value
    setSubscriptionForUsers(): void {
        this.teamList$.next(this.userService.getTeamMembers());
    }

    // todo form builder, add methoids

    saveAssignments() {
        this.popoverController.dismiss(this.assignedUsers);
    }

    dismiss() {
        this.popoverController.dismiss();
    }

    assignUser(selectIndex: number, $event: CustomEvent): void {
        this.assignedUsers.set(selectIndex, this.teamList$.getValue().find((teamMember: User) => teamMember.id === $event.detail.value));
        if (this.task.assignees && this.task.assignees.length) {
            this.task.assignees.push($event.detail.value);
        } else {
            this.task.assignees = [$event.detail.value];
        }
        this.taskService.update(this.task);
        console.log(this.task);
    }

    removeUserFromTask(index: number, id: number): void {
        if (this.assignedUsers.get(index) && this.assignedUsers.get(index).id === id) {
            remove(this.task.assignees, id);
            this.assignedUsers.delete(index);
            this.chengeDetector.detectChanges();
        }
    }

    isUserAssigned(id: number): User {
        if (!this.assignedUsers) {
            return null;
        } else {
            for (const usr of this.assignedUsers.values()) {
                if (usr.id === id) {
                    return usr;
                }
            }
        }
    }
}

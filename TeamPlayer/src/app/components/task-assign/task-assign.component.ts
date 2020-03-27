import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Change } from '@ionic/angular-toolkit/schematics/util/change';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-task-assign',
    templateUrl: './task-assign.component.html',
    styleUrls: [ './task-assign.component.scss' ],
})
export class TaskAssignComponent implements OnInit {
    @Input() task: Task;
    teamList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    assignedUsers: Map<number, User> = new Map();

    constructor(private userService: UserService, private popoverController: PopoverController) {}

    ngOnInit() {
        this.setSubscriptionForUsers();
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
    }

    isUserAssigned(id: number): User {
        for (const usr of this.assignedUsers.values()) {
            if (usr.id === id) {
                return usr;
            }
        }
    }
}

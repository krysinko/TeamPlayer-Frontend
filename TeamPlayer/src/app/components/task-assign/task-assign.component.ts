import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
    selector: 'app-task-assign',
    templateUrl: './task-assign.component.html',
    styleUrls: [ './task-assign.component.scss' ],
})
export class TaskAssignComponent implements OnInit {
    @Input() task: Task;
    teamList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    assignedUsers: Set<User> = new Set<User>();
    editAssignedUsersState: boolean = false;

    constructor(
        private userService: UserService,
        private popoverController: PopoverController,
        private taskService: TaskService,
        private chengeDetector: ChangeDetectorRef) {
        this.setSubscriptionForUsers();
    }

    ngOnInit() {
        if (this.task && this.task.assignees) {
            this.editAssignedUsersState = true;
            this.task.assignees.forEach((usr: User) => {
                this.assignedUsers.add(usr);
                // this.assignedUsers.set(index, this.teamList$.getValue().find((u: User) => u.id === usr));
            });
            console.log(this.assignedUsers);
        } else {
            for (let i = 0; i < 3; i++) {
                this.assignedUsers.add(new User());
            }
        }
    }

    // todo should handle observable value
    setSubscriptionForUsers(): void {
        this.projectService.getUsers();
        this.teamList$.next(this.userService.getTeamMembers());
    }

    // todo form builder, add methoids

    saveAssignments() {
        this.popoverController.dismiss(this.assignedUsers);
    }

    dismiss() {
        this.popoverController.dismiss();
    }

    assignUser(user: User, $event: CustomEvent): void {
        this.assignedUsers.add(user);
        // this.assignedUsers.set(selectIndex, this.teamList$.getValue().find((teamMember: User) => teamMember.id === $event.detail.value));
        if (this.task.assignees && this.task.assignees.length) {
            this.task.assignees.push(user);
        } else {
            this.task.assignees = [ user ];
        }
        // this.taskService.updateTask(this.task);
        console.log(this.task);
    }

    removeUserFromTask(user: User): void {
        this.assignedUsers.delete(user);
        // if (this.assignedUsers.get(index) && this.assignedUsers.get(index).id === id) {
        //     remove(this.task.assignees, id);
        //     this.assignedUsers.delete(index);
        this.chengeDetector.detectChanges();
        // }
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

    addOneMoreEntry() {

    }
}

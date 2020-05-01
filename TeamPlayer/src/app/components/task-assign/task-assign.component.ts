import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'app-task-assign',
    templateUrl: './task-assign.component.html',
    styleUrls: [ './task-assign.component.scss' ],
})
export class TaskAssignComponent implements OnInit {
    @Input() task: Task;
    @Input() editAssignedUsersState: boolean = true;
    teamList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    assignedUsers: Set<User> = new Set<User>();

    constructor(
        private userService: UserService,
        private popoverController: PopoverController,
        private taskService: TaskService,
        private chengeDetector: ChangeDetectorRef,
        private projectService: ProjectService) {
    }

    ngOnInit() {
        if (this.task && this.task.assignees) {
            this.setSubscriptionForUsers();
            this.editAssignedUsersState = true;
            this.task.assignees.forEach((usr: User) => {
                this.assignedUsers.add(usr);
            });
            console.log(this.assignedUsers);
        } else {
            for (let i = 0; i < 3; i++) {
                this.assignedUsers.add(new User());
            }
        }
        this.chengeDetector.detectChanges();
    }

    setSubscriptionForUsers(): void {
        this.projectService.getProjectTeamMembers(this.task.project.id)
            .subscribe((members: User[]) => {
                this.teamList$.next(members);
            });
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

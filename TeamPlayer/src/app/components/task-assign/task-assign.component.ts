import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { skipWhile } from 'rxjs/operators';
import { isEmpty, find } from 'lodash';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

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
    assignmentForm: FormArray;

    constructor(
        private userService: UserService,
        private popoverController: PopoverController,
        private taskService: TaskService,
        private chengeDetector: ChangeDetectorRef,
        private projectService: ProjectService,
        private formBuilder: FormBuilder) {
        this.assignmentForm = this.formBuilder.array([]);
    }

    ngOnInit() {

        // let usrsset = [];
        if (this.task && this.task.assignees) {
            this.teamList$.next(this.task.project.users);
            this.setSubscriptionForUsers();
            this.editAssignedUsersState = true;
            this.task.assignees.forEach((usr: User) => {
                this.assignedUsers.add(usr);
                const ctrl: FormControl = this.formBuilder.control(usr.id);
                this.assignmentForm.push(ctrl);
                console.log(this.assignedUsers.values(), this.assignmentForm);
            });
            if (this.assignedUsers.size < 3) {
                do {
                    const ctrl: FormControl = this.formBuilder.control('');
                    this.assignmentForm.push(ctrl);
                    console.log(this.assignedUsers, this.assignmentForm);
                } while (this.assignmentForm.controls.length < 3);
            }

            console.log(this.assignedUsers, this.assignmentForm);
        } else {
            for (let i = 0; i < 3; i++) {
                this.assignedUsers.add(new User());
            }
        }

        this.assignmentForm.valueChanges.subscribe((data) => {
            console.log(data);
        });
        this.chengeDetector.detectChanges();
    }

    setSubscriptionForUsers(): void {
        this.projectService.getProjectTeamMembers(this.task.project.id)
            .pipe(
                skipWhile((members: User[]) => isEmpty(members))
            )
            .subscribe((members: User[]) => {
                this.teamList$.next(members);
                console.log(members);
            });
    }

    // todo form builder, add methoids

    saveAssignments() {
        this.popoverController.dismiss(this.assignedUsers);
    }

    dismiss() {
        this.popoverController.dismiss();
    }

    assignUser($event: CustomEvent, index: number): void {
        const selectedUser: User = this.getTeamMemberById($event.detail.value);
        this.assignedUsers.add(selectedUser);
    }

    removeUserFromTask(userId: number, index: number): void {
        const us = this.getTeamMemberById(userId);
        this.assignedUsers.forEach(user => user.id === userId ? this.assignedUsers.delete(user) : user);
        this.assignmentForm.removeAt(index);
    }

    isUserAssigned(id: number): boolean {
        let state = false;
        if (!this.assignedUsers.size) {
            return null;
        } else {
            this.assignedUsers.forEach((user: User) => {
                if (user.id === id) {
                    state = true;
                }
            });
        }
        return state;
    }

    addOneMoreEntry() {
        const ctrl: FormControl = this.formBuilder.control(null);
        this.assignmentForm.push(ctrl);
    }

    private getTeamMemberById(id: number): User {
        return this.teamList$.getValue().find((usr: User) => usr.id === id);
    }
}

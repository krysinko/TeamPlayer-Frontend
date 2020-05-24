import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-task-assign',
    templateUrl: './task-assign.component.html',
    styleUrls: [ './task-assign.component.scss' ],
})
export class TaskAssignComponent implements OnInit {
    // @Input() task: Task;
    // @Input() editAssignedUsersState: boolean = true;
    teamList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    @Input() projectId: number = null;
    @Input() assignees: User[] = [];
    assignedUsers: Set<User> = new Set<User>();
    assignmentForm: FormGroup;
    assignmentsFormArray: FormArray;

    constructor(
        private userService: UserService,
        private popoverController: PopoverController,
        private taskService: TaskService,
        private chengeDetector: ChangeDetectorRef,
        private projectService: ProjectService,
        private formBuilder: FormBuilder) {
        this.assignmentForm = this.formBuilder.group({
            assignments: this.formBuilder.array([])
        });
        this.assignmentsFormArray = this.assignmentForm.get('assignments') as FormArray;
    }

    ngOnInit() {
        console.log(this.projectId, this.assignees);
        if (this.projectId) {
            this.setSubscriptionForUsers();
            this.setAssignmentsAndFormData();
            console.log(this.assignedUsers, this.assignmentForm);
        }
        this.fillFormWithEmptyEntries();

        this.assignmentForm.valueChanges.subscribe((data) => {
            console.log(data);
        });
        this.chengeDetector.detectChanges();
    }

    setSubscriptionForUsers(): void {
        this.projectService.getProjectTeamMembers(null, this.projectId)
            .subscribe((members: User[]) => {
                this.teamList$.next(members);
                this.setAssignmentsAndFormData();
                console.log(members, this.projectId);
            });
    }

    saveAssignments() {
        this.popoverController.dismiss(this.assignedUsers);
    }

    dismiss() {
        this.popoverController.dismiss();
    }

    assignUser($event: CustomEvent, index: number): void {
        const selectedUser: User = this.getTeamMemberById($event.detail.value);
        if (selectedUser) {
            this.assignedUsers.add(selectedUser);
        }
    }

    removeUserFromTask(userId: number, index: number): void {
        const us = this.getTeamMemberById(userId);
        if (this.assignedUsers.size) {
            this.assignedUsers.forEach(user => user.id === userId ? this.assignedUsers.delete(user) : user);
        }
        this.assignmentsFormArray.removeAt(index);
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
        this.assignmentsFormArray.controls.push(ctrl);
    }

    private getTeamMemberById(id: number): User {
        return this.teamList$.getValue().find((usr: User) => usr.id === id);
    }

    private setAssignmentsAndFormData() {
        if (this.assignees && this.assignees.length) {
            this.assignees.forEach((usr: User) => {
                this.buildFormControl(usr);
            });
        }
        this.fillFormWithEmptyEntries();
    }

    private buildFormControl(usr: User) {
        if (!!this.getTeamMemberById(usr.id)) {
            this.assignedUsers.add(usr);
            const ctrl: FormControl = this.formBuilder.control(usr.id);
            this.assignmentsFormArray.controls.push(ctrl);
        }
    }

    private fillFormWithEmptyEntries() {
        if ((this.assignedUsers.size < 3 || this.assignmentsFormArray.controls.length < 3) && this.teamList$.value.length > 3) {
            do {
                const ctrl: FormControl = this.formBuilder.control(null);
                this.assignmentsFormArray.controls.push(ctrl);
                console.log(this.assignedUsers, this.assignmentForm);
            } while (this.assignmentsFormArray.controls.length < 3);
            console.log(this.assignmentsFormArray.controls);
        }
    }
}

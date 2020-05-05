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
    assignedUsers: User[] = [];
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

        let usrsset = [];
        if (this.task && this.task.assignees) {
            this.teamList$.next(this.task.project.users);
            this.setSubscriptionForUsers();
            this.editAssignedUsersState = true;
            this.task.assignees.forEach((usr: User) => {
                usrsset.push(usr);
                const ctrl: FormControl = this.formBuilder.control(usr.id);
                this.assignmentForm.push(ctrl);
                console.log(usrsset, this.assignmentForm);
            });
            // if (this.assignedUsers.size < 3) {
            //     do {
            //         this.assignedUsers.add(<User>{});
            //         const ctrl: FormControl = this.formBuilder.control('');
            //         this.assignmentForm.push(ctrl);
            //         console.log(this.assignedUsers, this.assignmentForm);
            //     } while (this.assignedUsers.size < 3);
            // }

            console.log(this.assignedUsers, this.assignmentForm);
        } else {
            for (let i = 0; i < 3; i++) {
                usrsset.push(new User());
            }
        }
        this.assignedUsers = usrsset;



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

    assignUser(user: User = null, $event: CustomEvent): void {
        console.log($event);
        const selectedUser: User = this.getTeamMemberById($event.detail.value);
        let usrsset = this.assignedUsers;
        usrsset.push(selectedUser);
        // if (this.task.assignees && this.task.assignees.length) {
        //     this.task.assignees.push(user);
        // } else {
        //     this.task.assignees = [ user ];
        // }
        this.assignedUsers = usrsset;

        console.log(this.assignedUsers);
        this.chengeDetector.detectChanges();
    }

    removeUserFromTask(userId: number, index: number): void {
        let usrsset = this.assignedUsers;
        usrsset = usrsset.filter(u => u.id !== userId);
        this.assignmentForm.removeAt(index);

        // if (this.assignedUsers.get(index) && this.assignedUsers.get(index).id === id) {
        //     remove(this.task.assignees, id);
        //     this.assignedUsers.delete(index);
        this.assignedUsers = usrsset;
        this.chengeDetector.detectChanges();
        // }
    }

    // isUserAssigned(id: number): boolean {
    //     let usrsset = this.assignedUsers;
    //     let state = false;
    //     if (!usrsset.length) {
    //         return null;
    //     } else {
    //         usrsset.forEach((user: User) => {
    //             if (user.id === id) {
    //                 // console.log(user.id, id, user.id === id);
    //                 state = true;
    //             } else {
    //                 state = false;
    //             }
    //         });
    //     }
    //     return state;
    // }

    isUserAssigned(user: User): boolean {
        return !!find(this.assignedUsers, user);
    }

    addOneMoreEntry() {
        const ctrl: FormControl = this.formBuilder.control(null);
        this.assignmentForm.push(ctrl);
    }

    private getTeamMemberById(id: number): User {
        return this.teamList$.getValue().find((usr: User) => usr.id === id);
    }
}

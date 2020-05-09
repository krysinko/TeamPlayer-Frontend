import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonTaskAttributesActions } from '../common-task-attributes-actions';
import { Task, TaskProgressInStartToEndOrder, TaskStatus } from '../../../../models/task';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project';
import { User } from '../../../../models/user';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.page.html',
    styleUrls: [ './new-task.page.scss' ],
})
export class NewTaskPage extends CommonTaskAttributesActions implements OnInit {
    taskFormGroup: FormGroup;
    task: Task = {
        ...new Task(),
        deadline: new Date(),
        status: <TaskStatus> TaskProgressInStartToEndOrder[0],
    };
    userProjects: Project[];
    teamMembers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

    constructor(private formBuilder: FormBuilder, private projectService: ProjectService) {
        super();
        this.getUsersProjects();
        this.taskFormGroup = this.formBuilder.group({
            title: [ this.task.title, [Validators.required, Validators.maxLength(255)] ],
            deadline: [ this.task.deadline, Validators.required ],
            status: [ this.task.status, Validators.required ],
            assignees: [],
            content: '',
            project: [ '', Validators.required ],
        });
    }

    ngOnInit() {
    }

    saveTask() {

    }

    getTeamMembers($event: CustomEvent): void {
        this.projectService.getProjectTeamMembers($event.detail.value).subscribe((users: User[]) => {
            this.teamMembers$.next(users);
        });
    }

    resetAssignedUsersAndTeamMembers($event: CustomEvent) {
        this.taskFormGroup.controls['assignees'].reset();
        this.newTaskAsignees.next([]);
        this.getTeamMembers($event);
    }

    private getUsersProjects(): void {
        this.projectService.getUsersProjects().pipe().subscribe((projects: Project[]) => {
            this.userProjects = projects;
        });
    }
}

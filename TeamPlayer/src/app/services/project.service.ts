import { Injectable } from '@angular/core';
import { ProjectApiService } from './api/project-api.service';
import { Project } from '../models/project';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    get teamMembers$(): Observable<User[]> {
        return this._teamMembers$.asObservable();
    }

    private _usersProjects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    private _teamMembers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

    constructor(private projectApiService: ProjectApiService, private userService: UserService) {
    }

    getProjectTeamMembers(project: Project, projectId: number = null): Observable<User[]> {
        return this.projectApiService.getProjectById(project ? project.id : projectId)
            .pipe(
                map((proj: Project) => {
                    this._teamMembers$.next(proj.users);
                    // console.log(proj.users);
                    return proj.users;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    return of(null);
                })
            );

    }

    getUsersProjects(id: number = null): Observable<Project[]> {
        if (!id) {
            return this.userService.getUserData().pipe(
                map((user: User) => {
                    id = user.id;
                }),
                switchMap(() => this.projectApiService.getProjectsByUserId(id)),
                map((projects: Project[]) => {
                    this._usersProjects$.next(projects);
                    return projects;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    return of(null);
                })
            );
        } else {
            return this.projectApiService.getProjectsByUserId(id)
                .pipe(
                    map((projects: Project[]) => {
                        this._usersProjects$.next(projects);
                        return projects;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        console.log(error);
                        return of(null);
                    })
                );
        }

    }
}

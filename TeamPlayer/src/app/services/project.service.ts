import { Injectable } from '@angular/core';
import { ProjectApiService } from './api/project-api.service';
import { Project } from '../models/project';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    get teamMembers$(): Observable<User[]> {
        return this._teamMembers$.asObservable();
    }

    private _teamMembers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

    constructor(private projectApiService: ProjectApiService) {
    }

    getProjectTeamMembers(projectId: number): Observable<User[]> {
         return this.projectApiService.getProjectById(projectId)
            .pipe(
                map((project: Project) => {
                    this._teamMembers$.next(project.users);
                    console.log(project.users);
                    return project.users;
                }),
                catchError((error: HttpErrorResponse) => {
                  console.log(error);
                  return of(null);
                })
            );

    }
}

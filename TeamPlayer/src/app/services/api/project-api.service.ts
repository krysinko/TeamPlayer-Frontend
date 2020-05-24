import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/project';
import { API_URL, projectApiByIdPath, projectApiByUserIdPath } from './endpoints';

@Injectable({
    providedIn: 'root'
})
export class ProjectApiService {

    constructor(private http: HttpClient) {
    }

    getProjectById(id: number): Observable<Project> {
        // console.log(id);
        return this.http.get<Project>(API_URL + projectApiByIdPath + id);
    }

    getProjectsByUserId(id: number): Observable<Project[]> {
        // console.log(id);
        return this.http.get<Project[]>(API_URL + projectApiByUserIdPath + id);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { API_URL, tasksApiPath } from './endpoints';

@Injectable({
    providedIn: 'root'
})
export class ProjectApiService {

    constructor(private http: HttpClient) {
    }

    getProjectById(id: number): Observable<Project> {
        return this.http.get<Project>(API_URL + tasksApiPath);
    }
}

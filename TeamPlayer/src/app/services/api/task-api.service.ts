import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tasksApiPath } from './endpoints';
import { Observable } from 'rxjs';
import { Task} from '../../models/task';


const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class TaskApiService {

    constructor(private http: HttpClient) {
    }

    getTasksFromApi(): Observable<Task[]> {
        return this.http.get<Task[]>(API_URL + tasksApiPath);
    }

    getTaskFromApi(id: number): Observable<Task> {
        return this.http.get<Task>(API_URL + tasksApiPath + '/' + id);
    }

    update(task: Task): Observable<Task> {
        return this.http.put<Task>(API_URL + tasksApiPath + '/' + task.id, task);
    }
}

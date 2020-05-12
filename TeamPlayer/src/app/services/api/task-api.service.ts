import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpSentEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { API_URL, tasksApiPath } from './endpoints';
import { Observable } from 'rxjs';
import { Task} from '../../models/task';

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
        return this.http.get<Task>(API_URL + tasksApiPath + id);
    }

    update(task: Task): Observable<Task> {
        console.log(task);
        return this.http.put<Task>(API_URL + tasksApiPath + task.id, task);
    }

    postNewTask(task: Task): Observable<Task> {
        return this.http.post<Task>(API_URL + tasksApiPath, task);
    }
}

import { Injectable } from '@angular/core';
import { Meeting } from '../../models/meeting';
import { Observable } from 'rxjs';
import { API_URL, meetingsById, meetingsByUserPath } from './endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MeetingsApiService {

    constructor(private http: HttpClient) {
    }

    getMeetingsByUser(id: number): Observable<Meeting[]> {
        return this.http.get<Meeting[]>(API_URL + meetingsByUserPath + id);
    }

    getMeetingById(id: number): Observable<Meeting> {
        return this.http.get<Meeting>(API_URL + meetingsById + id);
    }
}

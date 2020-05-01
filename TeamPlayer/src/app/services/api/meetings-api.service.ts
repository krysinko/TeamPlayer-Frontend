import { Injectable } from '@angular/core';
import { Meeting } from '../../models/meeting';
import { Observable } from 'rxjs';
import { API_URL, meetingsByUserPath } from './endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MeetingsApiService {

    constructor(private http: HttpClient) {
    }

    getMeetings(id: number): Observable<Meeting[]> {
        return this.http.get<Meeting[]>(API_URL + meetingsByUserPath + id);
    }
}
